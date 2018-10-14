import axios from 'axios';

const meetingsURL =
  'https://api.mlab.com/api/1/databases/forslush/collections/meetings?apiKey=zKnTxbaaypzWM0SnUGVqfhfIqIsS9YB-';
const postsApi = filterMethod =>
  `https://api.mlab.com/api/1/databases/forslush/collections/posts?apiKey=zKnTxbaaypzWM0SnUGVqfhfIqIsS9YB-&q={category:${JSON.stringify(
    filterMethod
  )}}`;

const ON_FILTER_INI = 'ON_FILTER_INIT';
const ON_FILTER_SUCCESS = 'ON_FILTER_SUCCESS';
const CHANGE_FILTER_TEXT = 'CHANGE_FILTER_TEXT';

const fixTypos = {
  Latest: 'activity',
  Products: 'product',
  Activities: 'activity',
  Pitch: 'pitch',
  Challenges: 'challenge'
};

const onFilter = filterMethod => {
  return dispatch => {
    dispatch({
      type: ON_FILTER_INI,
      filterMethod: filterMethod
    });
    axios.get(postsApi(fixTypos[filterMethod])).then(res =>
      dispatch({
        type: ON_FILTER_SUCCESS,
        filterMethod: filterMethod,
        results: res.data
      })
    );
  };
};

const changeFilterText = filterMethod => {
  return {
    type: CHANGE_FILTER_TEXT,
    filterMethod
  };
};

const ADD_TO_SUGGESTIONS = 'ADD_TO_SUGGESTIONS';

const addToSuggestions = person => {
  return {
    type:ADD_TO_SUGGESTIONS,
    person,
  }
};

const ON_BOOK_SUCCESS = 'ON_BOOK_SUCCESS';
const GET_MEETINGS_INI = 'GET_MEETINGS_INI';
const GET_MEETINGS_SUCCESS = 'GET_MEETINGS_SUCCESS';

const getMeetings = () => {
  return dispatch => {
    dispatch({
      type: GET_MEETINGS_INI,
    })
    axios.get(meetingsURL).then((res) => {
      dispatch({
        type: GET_MEETINGS_SUCCESS,
        results: res.data,
      });
    });
  };
};
const onBookMeeting = (body, successAction) => {
  return dispatch => {
    axios.post(meetingsURL, body).then(() => {
      if (typeof successAction === 'function') {
        successAction();
      }
      dispatch({
        type: ON_BOOK_SUCCESS,
        body
      });
    });
  };
};

export {
  onFilter,
  onBookMeeting,
  changeFilterText,
  getMeetings,
  GET_MEETINGS_INI,
  GET_MEETINGS_SUCCESS,
  ON_FILTER_INI,
  ON_FILTER_SUCCESS,
  ON_BOOK_SUCCESS,
  CHANGE_FILTER_TEXT,
  ADD_TO_SUGGESTIONS,
  addToSuggestions,
};
