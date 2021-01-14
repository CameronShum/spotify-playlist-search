import React from 'react';
import firebase from 'firebase';
import 'firebase/database';
import dotenv from 'dotenv';
import nominations from 'types/nominations.types';

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

type State = nominations
type Action = {
  type: 'nominate',
  payload: {
    title: string,
    imdbId: string,
    year: string,
  }
} | {
  type: 'remove',
  payload: {
    imdbId: string,
  }
}
type Dispatch = (action: Action) => void
interface FirebaseProviderProps {
  children: React.ReactNode
}

const FirebaseStateContext = React.createContext<State | undefined>(undefined);
const FirebaseDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const firebaseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'nominate': {
      const { imdbId, title, year } = action.payload;
      return {
        ...state,
        [imdbId]: {
          title,
          year,
          nominated: true,
        },
      };
    }

    case 'remove': {
      return {
        ...state,
        [action.payload.imdbId]: {
          ...state[action.payload.imdbId],
          nominated: false,
        },
      };
    }

    default: {
      throw new Error('Unhandled action');
    }
  }
};

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [state, dispatch] = React.useReducer(firebaseReducer, {});

  return (
    <FirebaseStateContext.Provider value={state}>
      <FirebaseDispatchContext.Provider value={dispatch}>
        {children}
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
  const context = React.useContext(FirebaseStateContext);

  if (context === undefined) {
    throw new Error('useFirebaseDispatch should be used in a FirebaseProvider');
  }
  return context;
};

export { FirebaseProvider, useFirebaseState, useFirebaseDispatch };
