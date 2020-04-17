import React from 'react';

import Speakers from '../components/Speakers';

class Page_Speakers extends React.PureComponent {
          
  render() {

    return (
      <Speakers
      speakers= {
        [{id:1, name:"Ivanov Ivan", phone:'123231', position: 'Developer', topic: 'Java'}, 
        {id:2, name:"Gobom Pavel", phone:'5661651', position: 'Q&A', topic: 'Q&A'}, 
        {id:3, name:"Livan Aleksandr", phone:'658451', position: 'HR', topic: 'HR'},
        {id:4, name:"Prohorov Prohor", phone:'98542', position: 'JavaScript', topic: 'JavaScript'}]
    }
      />
    );
    
  }

}
    
export default Page_Speakers;