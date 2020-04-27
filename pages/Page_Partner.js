import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { infoThunkAC } from "../redux/fetchThunk";
import PartnerInfo from '../components/PartnerInfo';


class Page_Partner extends React.PureComponent {

    static propTypes = {
        info: PropTypes.object.isRequired,
      };

      componentDidMount() {
        this.props.dispatch( infoThunkAC(this.props.dispatch) );
      }
          
    render() {

    // раз написано <Route path="/client/:clid" component={Page_Client} />
    // значит Page_Client получит то что в УРЛе после /client/ под именем props.match.params.clid в виде строки
        let partnerId=parseInt(this.props.match.params.clid);

        let partnerData=this.props.info.data.find( c => c.id===partnerId );

    return (
      <PartnerInfo
        partner={partnerData}
      />
    );
    
  }

}
const mapStateToProps = function (state) {
    return {
      info: state.info,
    };
  };
  
export default connect(mapStateToProps)(Page_Partner);
      
    