import React, { useEffect, useReducer, useState } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import dotenv from 'dotenv';
import Nominations from 'types/Nominations.types';
import GlobalNominations from 'types/GlobalNominations.types';
import firebaseReducer, { Action, State } from './firebaseReducer';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: 'shopify-frontend-challen-c545a.firebaseapp.com',
  databaseURL: 'https://shopify-frontend-challen-c545a-default-rtdb.firebaseio.com',
  projectId: 'shopify-frontend-challen-c545a',
  storageBucket: 'shopify-frontend-challen-c545a.appspot.com',
  messagingSenderId: '57388083015',
  appId: '1:57388083015:web:9cda3231eed1dc7ae04e62',
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

type Dispatch = (action: Action) => void
interface FirebaseProviderProps {
  children: React.ReactNode
}

const FirebaseStateContext = React.createContext<State | undefined>(undefined);
const FirebaseDispatchContext = React.createContext<Dispatch | undefined>(undefined);
const UidDispatchContext = React.createContext<React.Dispatch<string> | undefined>(undefined);

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [uid, setUid] = useState('');
  const [state, dispatch] = useReducer(firebaseReducer,
    { nominations: {}, globalNominations: {} });

  useEffect(() => {
    async function getGlobalNominations() {
      const globalNominations: GlobalNominations = {};
      const globalNominationCounts = (await firebase.database().ref().child('globalNominations').once('value')).val();

      if (globalNominationCounts) {
        const nominations = Object.keys(globalNominationCounts)
          .filter((key) => globalNominationCounts[key] !== 0)
          .map((key) => (
            firebase.database().ref().child(`items/${key}`).once('value')
          ));
        const fullfilledNominations = await Promise.all(nominations);

        fullfilledNominations.forEach((snapshot) => {
          const nomination = snapshot.val();
          globalNominations[nomination.imdbId] = {
            title: nomination.title,
            year: nomination.year,
            count: globalNominationCounts[nomination.imdbId],
          };
        });
      }

      dispatch({ type: 'initGlobalNominations', payload: globalNominations });
    }

    getGlobalNominations();
  }, []);

  useEffect(() => {
    async function getUserNominations() {
      const firebaseNominations: Nominations = {};

      const userData = (await firebase.database().ref().child(`users/${uid}`).once('value')).val();

      if (userData) {
        const items = Object.keys(userData)
          .map((key) => firebase.database().ref().child(`items/${key}`).once('value'));
        const fullfilledItems = await Promise.all(items);

        fullfilledItems.forEach((snapshot) => {
          const nomination = snapshot.val();
          firebaseNominations[nomination.imdbId] = {
            title: nomination.title,
            year: nomination.year,
            nominated: true,
          };
        });

        dispatch({ type: 'signIn', payload: firebaseNominations });
      }
    }
    if (uid) {
      getUserNominations();
    }
  }, [uid]);

  return (
    <FirebaseStateContext.Provider value={state}>
      <FirebaseDispatchContext.Provider value={dispatch}>
        <UidDispatchContext.Provider value={setUid}>
          {children}
        </UidDispatchContext.Provider>
      </FirebaseDispatchContext.Provider>
    </FirebaseStateContext.Provider>
  );
};

const useFirebaseState = () => {
  const context = React.useContext(FirebaseStateContext);
  if (context === undefined) {
    throw new Error('useFirebaseState should be used in a FirebaseProvider');
  }
  return context;
};

const useFirebaseDispatch = () => {
  const context = React.useContext(FirebaseDispatchContext);
  if (context === undefined) {
    throw new Error('useFirebaseDispatch should be used in a FirebaseProvider');
  }
  return context;
};

const useUidDispatch = () => {
  const context = React.useContext(UidDispatchContext);
  if (context === undefined) {
    throw new Error('useUidDispatch should be used in a FirebaseProvider');
  }
  return context;
};

export {
  useFirebaseState, useFirebaseDispatch, useUidDispatch,
};

export default FirebaseProvider;
