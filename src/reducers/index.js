import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import sign from "./sign";
import user from "./user";
import admin from "./admin";



const reducers = combineReducers({ sign, user, admin });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
