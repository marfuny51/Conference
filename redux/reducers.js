import { combineReducers } from 'redux';

import infoReducer from "./infoReducer";

let combinedReducer=combineReducers({
    info: infoReducer, // редьюсер countriesReducer отвечает за раздел state под именем countries
    // + другие редьюсеры
});

export default combinedReducer;
