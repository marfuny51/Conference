import React from 'react';
import PropTypes from 'prop-types';

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
        Partner &laquo;{this.props.partner.name}&raquo;, Country {this.props.partner.country}
      </h1>
    )
    ;

  }

}

export default PartnerInfo;
