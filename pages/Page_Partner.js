import React from 'react';


import PartnerInfo from '../components/PartnerInfo';

class Page_Partner extends React.PureComponent {
          
    render() {

        var info = require('../db.json');
        let partnerId=parseInt(this.props.match.params.clid);
        let partnerData=info.partners.find( c => c.id==partnerId );

    return (
        <PartnerInfo
          partner={partnerData}
        />
    ); 
  }
}
  
export default Page_Partner;
      
    