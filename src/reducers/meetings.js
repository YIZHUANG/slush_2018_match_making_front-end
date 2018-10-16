import {
  GET_MEETINGS_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  meetings: []
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEETINGS_SUCCESS:
      return {...state, meetings: action.results};
    default:
      return state;
  }
};
