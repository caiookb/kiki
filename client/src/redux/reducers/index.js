import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ChatReducer from "./ChatReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  auth: AuthReducer,
  chat: ChatReducer,
  user: UserReducer,
});
