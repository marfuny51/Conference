import isoFetch from 'isomorphic-fetch';

import { infoLoadingAC, infoErrorAC, infoSetAC } from "./infoAC";

function infoThunkAC(dispatch) {
    // Как и любой action creator, countriesThunkAC должен вернуть action,
    // только action будет не хэш, а ФУНКЦИЯ.
    // Все middleware стоят ДО редьюсеров, их задача - преобразовывать или фильтровать action-ы.
    // Конкретно middleware "thunk", если обнаруживает что action - функция а не хэш, 
    // ВЫПОЛНЯЕТ эту функцию и не пропускает её дальше, к редьюсерам.
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'PROBA_PERA7');
    return function() {
        dispatch( infoLoadingAC() );
        isoFetch(ajaxHandlerScript, { method: 'post', body: sp })
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

export {infoThunkAC};
