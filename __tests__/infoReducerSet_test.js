"use strict";

import React from 'react';
import { INFO_SET} from '../redux/infoAC';
import infoReducer  from '../redux/infoReducer'
test('работа infoReducer', () => {
const action = { 
    type: INFO_SET,
    info:{"partners":[{"id": 1, "name": "ELAM System","country": "Germany"},{"id": 2,"name": "MediaCorporation","country": "USA"}]}
  }
  const initState={

    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    data: null,
  
  }

  expect(infoReducer(initState,action)).toEqual({
    status:3,
    data: {partners:[{id: 1, name: "ELAM System",country: "Germany"},{id: 2,name: "MediaCorporation",country: "USA"}]}
  })
  
   
  
})