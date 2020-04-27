"use strict";

import React from 'react';
import { INFO_SORT } from '../redux/infoAC';
import infoReducer  from '../redux/infoReducer'
test('работа infoReducer', () => {
const action = { 
    type: INFO_SORT,
    info:[{"id": 1, "name": "MediaCorporation","country": "Germany"},{"id": 2,"name": "Sistem knowledges","country": "USA"}, {"id": 3,"name": "ELAM System", "country": "Belarus"}]
  }
  const initState={

    status: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    data: null,
  
  }

  expect(infoReducer(initState,action)).toEqual({
    status:3,
    data: [{id: 3,name: "ELAM System", country: "Belarus"},{id: 1, name: "MediaCorporation",country: "Germany"}, {id: 2,name: "Sistem knowledges",country: "USA"}]
  })
  
   
  
})