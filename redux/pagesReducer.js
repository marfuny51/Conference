
import { PAGES_LOADING, PAGES_ERROR, PAGES_SET } from './pagesAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function pagesReducer(state=initState,action) {
  switch (action.type) {

    case PAGES_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case PAGES_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case PAGES_SET: {
      let newState={
        status:3,
        data:JSON.parse(action.info.result),
      };
      return newState;
    }
    
    default:
      return state;
  }
}

export default pagesReducer;
