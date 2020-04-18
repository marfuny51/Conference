import { combineReducers } from 'redux';

import pagesReducer from "./pagesReducer";

let combinedReducer=combineReducers({
    info: pagesReducer, 
  
});

export default combinedReducer;
