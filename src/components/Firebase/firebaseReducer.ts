import nominations from 'types/nominations.types';

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
} | {
  type: 'login',
  payload: {
    [s: string]: {
      title: string,
      year: string,
    }
  }
}

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

    case 'login': {
      const { payload } = action;
      const firebaseNominations: nominations = {};
      Object.keys(payload).forEach((key) => {
        firebaseNominations[key] = {
          ...payload[key],
          nominated: true,
        };
      });
      return {
        ...firebaseNominations,
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
