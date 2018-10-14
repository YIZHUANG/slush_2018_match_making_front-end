import faker from 'faker';

import {
  ON_FILTER_INI,
  ON_FILTER_SUCCESS,
  CHANGE_FILTER_TEXT,
  ADD_TO_SUGGESTIONS
} from '../actions';

const defaultSuggestions = {
  creater: 'Yi',
  createrLogo: faker.image.cats()
};

const INITIAL_STATE = {
  filterMethod: 'Latest',
  filteringInProgress: false,
  results: {
    Latest: { loaded: false, results: [] },
    Products: { loaded: false, results: [] },
    Activities: { loaded: false, results: [] },
    Pitch: { loaded: false, results: [] },
    Challenges: { loaded: false, results: [] }
  },
  suggestions: [defaultSuggestions]
};

function updateData(filterMethod, results, state) {
  return {
    ...state,
    filteringInProgress: false,
    results: {
      ...state.results,
      [filterMethod]: { loaded: true, results: results }
    }
  };
}

function addToSuggestion(person, state) {
  if (state.suggestions.find(hacker => hacker.creater === person.creater)) {
    return state;
  }
  return { ...state, suggestions: [person, ...state.suggestions] };
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_FILTER_INI:
      return {
        ...state,
        filteringInProgress: true,
        filterMethod: action.filterMethod
      };
    case ON_FILTER_SUCCESS:
      return updateData(action.filterMethod, action.results, state);
    case CHANGE_FILTER_TEXT:
      return { ...state, filterMethod: action.filterMethod };
    case ADD_TO_SUGGESTIONS:
      return addToSuggestion(action.person, state);
    default:
      return state;
  }
};
