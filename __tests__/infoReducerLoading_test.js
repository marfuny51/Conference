"use strict";

import React from 'react';
import { INFO_LOADING} from '../redux/infoAC';
import infoReducer  from '../redux/infoReducer'
test('работа infoReducer', () => {
const action = { 
    type: INFO_LOADING,
  }
  const initState={

    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    data: null,
  
  }

  expect(infoReducer(initState,action)).toEqual({
    status:1,
    data:null,
  })
  
   
  
})