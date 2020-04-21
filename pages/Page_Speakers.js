import React from 'react';

import Speakers from '../components/Speakers';

class Page_Speakers extends React.PureComponent {
          
  render() {

    return (
      <Speakers />
    );
    
  }

}
    
export default Page_Speakers;
    
/*
Topics
      topics= {
          [{id:1, title:"Java", mainWords:'Array, Ajax, JSON', author: 'Ivanov Ivan'}, 
          {id:2, title:"Q&A", mainWords:'Array, Ajax, JSON', author: 'Gobom Pavel'}, 
          {id:3, title:"HR", mainWords:'Array, Ajax, JSON', author: 'Livan Aleksandr'},
          {id:4, title:"JavaScript", mainWords:'Array, Ajax, JSON', author: 'Prohorov Prohor'}]
      }
*/    
