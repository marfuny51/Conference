import React from 'react';

import PartnerInfo from '../components/PartnerInfo';

import appData from '../appData';

class Page_Partner extends React.PureComponent {
          
  render() {

    // раз написано <Route path="/client/:clid" component={Page_Client} />
    // значит Page_Client получит то что в УРЛе после /client/ под именем props.match.params.clid в виде строки
    let clientId=parseInt(this.props.match.params.clid);

    let clientData=appData.clientsArr.find( c => c.id==clientId );

    return (
      <PartnerInfo
        partner={partnerData}
      />
    );
    
  }

}
    
export default Page_Partner;
    