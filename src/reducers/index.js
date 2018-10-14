import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import sort from './sort';
import meetings from './meetings';
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  auth: AuthReducer,
  form: reduxForm,
  sort,
  meetings,
});
