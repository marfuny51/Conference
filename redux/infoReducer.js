import { INFO_LOADING, INFO_ERROR, INFO_SET } from './infoAC';

const initState={

  status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
  data: null,

}

function infoReducer(state=initState,action) {
  switch (action.type) {

    case INFO_LOADING: {
      let newState={
        status:1,
        data:null,
      };
      return newState;
    }

    case INFO_ERROR: {
      let newState={
        status:2,
        data:null,
      };
      return newState;
    }

    case INFO_SET: {
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

export default infoReducer;
