import {  createStore } from "redux";
import rootReducer from "./reducers";
                     //configuring store with props loaded from reducer
export default function configureStore(preloadedState) {
   const store = createStore(rootReducer, preloadedState);
  return store;
}
