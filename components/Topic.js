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

  state = {
    classNameDiv: 'ReadDiv',
    classNameRead: 'Read',
  }

  deleteTopic = () => {
    let question = confirm('Do you sure? You are going to delete this information.');
    if(question) {
      voteEvents.emit('EDeleteTopic', this.props.topic.id);
    }
  }

  editTopic = () => {
    voteEvents.emit('EEditTopic', this.props.topic.id);
  }

  moreRead = () => {
    this.setState({classNameDiv:'ReadDivAnim1', classNameRead:'ReadNone'});
    voteEvents.emit('EReadMore', this.props.topic.id);
  }

  hide = () => {
    this.setState({classNameDiv:'ReadDivAnim2', classNameRead:'Read'});
    voteEvents.emit('EHide', this.props.topic.id);
  }

  render() {
    let info = <div className={this.state.classNameDiv}>{this.props.topic.info}<br/><input type="button" value="Hide" className='Hide' onClick={this.hide}/></div>; 
    let readMore = <input type="button" value="Read more..." className={this.state.classNameRead} onClick={this.moreRead}/>;
    return (
      <tr key={this.props.topic.id}>
        <td className='LinkTd'>{this.props.topic.title}</td>
        <td>{this.props.topic.mainWords}</td>
        <td>{this.props.topic.author}</td>
        <td>{info}{readMore}</td>
        <td><input type="button" value="Edit" className='Read' disabled = {(this.props.mode===4)?true:false} onClick={this.editTopic}/></td>
        <td><input type="button" value="Delete" className='Read' disabled = {(this.props.mode===4)?true:false} onClick={this.deleteTopic}/></td>
      </tr>
    );

  }

}

export default Topic;
