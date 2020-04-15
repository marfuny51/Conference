import React from 'react';

import Topics from '../components/Topics';

class Page_Topics extends React.PureComponent {
          
  render() {

    return (
      <Topics
      topics= {
          [{id:1, title:"JavaScript", mainWords:'Array, Ajax', author: 'Vasechkin'}, 
          {id:2, title:"Java", mainWords:'Array, Ajax', author: 'Podpoly'}, 
          {id:3, title:"QA", mainWords:'Array, Ajax', author: 'Ivanov'},
          {id:4, title:"Pyton", mainWords:'Array, Ajax', author: 'Kozlov'}]
      }

      />
    );
    
  }

}
    
export default Page_Topics;
    
/*
Topics
        topics= {
            [{id:101, title:"Иванов И.И.", mainWords:'200', autor: 'z'}, 
            {id:105, title:"Сидоров С.С.", mainWords:'250', autor: 'z'}, 
            {id:110, title:"Петров П.П.", mainWords:'180', autor: 'z'},
            {id:120, title:"Григорьев Г.Г.", mainWords:'220', autor: 'z'}]
        }
*/    