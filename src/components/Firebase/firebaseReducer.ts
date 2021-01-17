import firebase from 'firebase/app';
import GlobalNominations from 'types/GlobalNominations.types';
import Nominations from 'types/Nominations.types';

type State = {
  nominations: Nominations,
  globalNominations: GlobalNominations
}

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
} | {
  type: 'signIn',
  payload: Nominations
} | {
  type: 'initGlobalNominations',
  payload: GlobalNominations
} | {
  type: 'signOut',
}

const firebaseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'nominate': {
      const { imdbId, title, year } = action.payload;
      const uid = firebase.auth().currentUser?.uid;
      const nextState = {
        ...state,
        nominations: {
          ...state.nominations,
          [imdbId]: {
            title,
            year,
            nominated: true,
          },
        },
      };

      if (uid) {
        const updates = {
          [`/users/${uid}/${imdbId}`]: true,
          [`/items/${imdbId}`]: {
            title,
            year,
            imdbId,
          },
        };

        firebase.database().ref().child(`globalNominations/${imdbId}`).once('value')
          .then(
            (snapshot) => {
              updates[`globalNominations/${imdbId}`] = snapshot.val() || 0 + 1;
              firebase.database().ref().update(updates);
            },
          );
        nextState.globalNominations = {
          ...state.globalNominations,
          [imdbId]: {
            title,
            year,
            count: (state.globalNominations[imdbId]?.count || 0) + 1,
          },
        };
      }

      return nextState;
    }

    case 'remove': {
      const { imdbId } = action.payload;
      const uid = firebase.auth().currentUser?.uid;
      const nextState = {
        ...state,
        nominations: {
          ...state.nominations,
          [imdbId]: {
            ...state.nominations[imdbId],
            nominated: false,
          },
        },
      };

      if (uid) {
        const updates: {[s: string]: any} = {
          [`/users/${uid}/${imdbId}`]: null,
        };

        firebase.database().ref().child(`globalNominations/${imdbId}`).once('value')
          .then(
            (snapshot) => {
              updates[`globalNominations/${imdbId}`] = snapshot.val() - 1;
              firebase.database().ref().update(updates);
            },
          );

        nextState.globalNominations = {
          ...state.globalNominations,
          [imdbId]: {
            ...state.globalNominations[imdbId],
            count: state.globalNominations[imdbId].count - 1,
          },
        };
      }
      return nextState;
    }

    case 'signIn': {
      const { payload } = action;
      return {
        ...state,
        nominations: {
          ...payload,
        },
      };
    }

    case 'signOut': {
      return {
        ...state,
        nominations: {},
      };
    }

    case 'initGlobalNominations': {
      const { payload } = action;
      return {
        ...state,
        globalNominations: {
          ...payload,
        },
      };
    }

    default: {
      throw new Error('Unhandled action');
    }
  }
};

export type { Action, State };
export default firebaseReducer;
