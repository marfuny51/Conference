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
    }),
  };

  render() {
    
    return (
      <tr key={this.props.topic.id}>
        <td><NavLink to={"/topic/"+this.props.topic.title}>{this.props.topic.title}</NavLink></td>
        <td>{this.props.topic.mainWords}</td>
        <td>{this.props.topic.author}</td>
        <td><input type="button" value="Read more..."/></td>
      </tr>
    );

  }

}

export default Topic;
