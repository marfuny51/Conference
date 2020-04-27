import React from 'react';
import PropTypes from 'prop-types';

import './PartnerInfo.css';

class PartnerInfo extends React.PureComponent {

  static propTypes = {
    partner:PropTypes.shape({
      id:PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }),
  };

  render() {
    return (
      <h1 className='Partner'>
        <span>Partner: </span> <span className='Name'>&laquo;{this.props.partner.name}&raquo;</span><br/>
        <span>Country: </span> <span className='Name'>{this.props.partner.country}</span>
      </h1>
    )
    ;

  }

}

export default PartnerInfo;
