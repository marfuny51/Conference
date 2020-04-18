import React from 'react';

import Topics from '../components/Topics';

class Page_Topics extends React.PureComponent {
          
  render() {

    return (
      <Topics
      topics= {
          [{id:1, title:"Java", mainWords:'Array, Ajax, JSON', author: 'Ivanov Ivan', info:'hfdkjhgdk'}, 
          {id:2, title:"Q&A", mainWords:'Array, Ajax, JSON', author: 'Gobom Pavel', info:'hfdkjhgdk'}, 
          {id:3, title:"HR", mainWords:'Array, Ajax, JSON', author: 'Livan Aleksandr', info:'hfdkjhgdk'},
          {id:4, title:"JavaScript", mainWords:'Array, Ajax, JSON', author: 'Prohorov Prohor', info:'hfdkjhgdk'}]
      }

      />
    );
    
  }

}
    
export default Page_Topics;
    
/*
Topics
      topics= {
          [{id:1, title:"Java", mainWords:'Array, Ajax, JSON', author: 'Ivanov Ivan'}, 
          {id:2, title:"Q&A", mainWords:'Array, Ajax, JSON', author: 'Gobom Pavel'}, 
          {id:3, title:"HR", mainWords:'Array, Ajax, JSON', author: 'Livan Aleksandr'},
          {id:4, title:"JavaScript", mainWords:'Array, Ajax, JSON', author: 'Prohorov Prohor'}]
      }
*/    