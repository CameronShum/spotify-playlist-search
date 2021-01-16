import firebase from 'firebase';
import Nominations from 'types/nominations.types';

type State = Nominations
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
  type: 'login',
  payload: Nominations
}

const firebaseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'nominate': {
      const { imdbId, title, year } = action.payload;
      const uid = firebase.auth().currentUser?.uid;

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
      }

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
      const { imdbId } = action.payload;
      const uid = firebase.auth().currentUser?.uid;

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
      }
      return {
        ...state,
        [imdbId]: {
          ...state[imdbId],
          nominated: false,
        },
      };
    }

    case 'login': {
      const { payload } = action;
      return {
        ...payload,
        ...state,
      };
    }

    default: {
      throw new Error('Unhandled action');
    }
  }
};

export type { Action, State };
export default firebaseReducer;
