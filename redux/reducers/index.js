import { combineReducers } from "redux";
import Settings from "./Setting";
import Common from "./Common";
import Auth from "./Auth";

const reducers = combineReducers({
  settings: Settings,
  auth: Auth,
  common: Common
});
export default reducers;
