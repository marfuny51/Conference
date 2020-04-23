import { combineReducers } from 'redux';

import buttonsReducer from "./buttonsReducer";

let combinedReducer=combineReducers({
    info: buttonsReducer,
});

export default combinedReducer;
