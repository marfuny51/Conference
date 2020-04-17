import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {voteEvents} from './events';

import './Speakers.css';

class Speaker extends React.PureComponent {

  static propTypes = {
    speaker:PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          phone: PropTypes.string.isRequired,
          position: PropTypes.string.isRequired,
          topic: PropTypes.string.isRequired,
        })
  };
  
  render() {

    return (
    <tr>
        <td><NavLink to={"/speaker/"+this.props.speaker.name}>{this.props.speaker.name}</NavLink></td>
        <td>{this.props.speaker.phone}</td>
        <td>{this.props.speaker.position}</td>
        <td>{this.props.speaker.topic}</td>
        <td><input type="button" value="Edit" disabled = {(this.props.newID===1)?false:true} /></td>
        <td><input type="button" value="Delete" disabled = {(this.props.mode===1)?false:true}/></td>
    </tr>
    );

  }

}

export default Speaker;
