import { combineReducers } from "redux";
import sort from './sort';
import meetings from './meetings';

export default combineReducers({
  sort,
  meetings,
});
