import { INFO_LOADING, INFO_ERROR, INFO_SET, INFO_SORT } from './infoAC';

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
        data:action.info,
      };
      return newState;
    }

    case INFO_SORT: {
      let newState={
        status:3,
        data:action.info.sort(function(a, b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);})
      };
      console.log(action.info);
      return newState;
    }
    
    default:
      return state;
  }
}

export default infoReducer;
