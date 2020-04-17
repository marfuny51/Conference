import React from 'react';

import Speakers from '../components/Speakers';

class Page_Speakers extends React.PureComponent {
          
  render() {

    return (
      <Speakers
      speakers= {
        [{name:"Ivanov Ivan", phone:'123231', position: 'Developer', topic: 'Java'}, 
        {name:"Gobom Pavel", phone:'5661651', position: 'Q&A', topic: 'Q&A'}, 
        {name:"Livan Aleksandr", phone:'658451', position: 'HR', topic: 'HR'},
        {name:"Prohorov Prohor", phone:'98542', position: 'JavaScript', topic: 'JavaScript'}]
    }
      />
    );
    
  }

}
    
export default Page_Speakers;