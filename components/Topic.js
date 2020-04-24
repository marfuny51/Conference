import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {voteEvents} from './events';

import './Topic.css';

class Topic extends React.PureComponent {

  static propTypes = {
    topic:PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      mainWords: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
    }),
  };

  deleteTopic = () => {
    voteEvents.emit('EDeleteTopic', this.props.topic.id);
  }

  editTopic = () => {
    voteEvents.emit('EEditTopic', this.props.topic.id);
  }

  moreRead = () => {
    voteEvents.emit('EReadMore', this.props.topic.id);
  }

  render() {
    let info = <div className='ReadDiv'>{this.props.topic.info}<br/><input type="button" value="Hide" className='Read' onClick={this.hide}/></div>; 
    let readMore = <input type="button" value="Read more..." className='Read' onClick={this.moreRead}/>;
    return (
      <tr key={this.props.topic.id}>
        <td><NavLink to={"/topic/"+this.props.topic.title} className='NavLink'>{this.props.topic.title}</NavLink></td>
        <td>{this.props.topic.mainWords}</td>
        <td>{this.props.topic.author}</td>
        <td>{(this.props.mode===55)?info:readMore}</td>
        <td><input type="button" value="Edit" className='Read' disabled = {(this.props.mode===2)?true:false} onClick={this.editTopic}/></td>
        <td><input type="button" value="Delete" className='Read' disabled = {(this.props.mode===2)?true:false} onClick={this.deleteTopic}/></td>
      </tr>
    );

  }

}

export default Topic;
