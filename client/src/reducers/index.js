import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import offer from "./offer";
import chat from "./chat";
import category from "./category";

export default combineReducers({
  alert,
  auth,
  offer,
  chat,
  category,
});
