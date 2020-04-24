import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {voteEvents} from './events';

import './Speaker.css';

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

  deleteSpeaker = () => {
    voteEvents.emit('EDelete', this.props.speaker.id);
  }

  editSpeaker = () => {
    voteEvents.emit('EEdit', this.props.speaker.id);
  }
  
  render() {

    return (
    <tr>
        <td><NavLink to={"/speaker/"+this.props.speaker.id} className='NavLink'>{this.props.speaker.name}</NavLink></td>
        <td>{this.props.speaker.phone}</td>
        <td>{this.props.speaker.position}</td>
        <td>{this.props.speaker.topic}</td>
        <td><input type="button" value="Edit" className='Read' disabled = {(this.props.mode===2)?true:false} onClick={this.editSpeaker}/></td>
        <td><input type="button" value="Delete" className='Read' disabled = {(this.props.mode===2)?true:false} onClick={this.deleteSpeaker}/></td>
    </tr>
    );

  }

}

export default Speaker;
