import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Speakers.css';

class Speaker extends React.PureComponent {

  static propTypes = {
    speakers:PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          phone: PropTypes.string.isRequired,
          position: PropTypes.string.isRequired,
          topic: PropTypes.string.isRequired,
        })
      ),
  };
  
  render() {

    return (
    <tr key={this.props.info.id}>
        <td><NavLink to={"/speaker/"+this.props.info.name}>{this.props.info.name}</NavLink></td>
        <td>{this.props.info.phone}</td>
        <td>{this.props.info.position}</td>
        <td>{this.props.info.topic}</td>
    </tr>
    );

  }

}

export default Speaker;
