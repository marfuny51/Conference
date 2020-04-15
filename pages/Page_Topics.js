import React from 'react';

import Topics from '../components/Topics';

import appData from '../appData';

class Page_Company extends React.PureComponent {
          
  render() {

    return (
      <Topics
        name={appData.companyName}
        clients={appData.clientsArr}
      />
    );
    
  }

}
    
export default Page_Company;
    