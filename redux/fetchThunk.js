import isoFetch from 'isomorphic-fetch';

import { infoLoadingAC, infoErrorAC, infoSetAC, infoSortAC } from "./infoAC";

function infoThunkAC(dispatch) {
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    return function() {
        dispatch( infoLoadingAC() );
        isoFetch("http://localhost:3000/partners")
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (data) => {
                dispatch( infoSetAC(data) );
            })
            .catch( (error) => {
                console.error(error);
                dispatch( infoErrorAC() );
            })
        ;
    }

}

function infoThunkAC2(dispatch) {
    return function() {
        dispatch( infoLoadingAC() );
        isoFetch("http://localhost:3000/partners")
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (data) => {
                dispatch( infoSortAC(data) );
            })
            .catch( (error) => {
                console.error(error);
                dispatch( infoErrorAC() );
            })
        ;
    }

}

export {infoThunkAC};
export {infoThunkAC2};

