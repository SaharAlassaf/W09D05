import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import sign from "./sign";
import auth from "./auth"



const reducers = combineReducers({ sign, auth });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
