import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Topic.css';

class Topic extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      mainWords: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  };

  render() {
    
    return (
      <tr key={this.props.info.id}>
        <td><NavLink to={"/topic/"+this.props.info.title}>{this.props.info.title}</NavLink></td>
        <td>{this.props.info.mainWords}</td>
        <td>{this.props.info.author}</td>
        <td><input type="button" value="Read more..."/></td>
      </tr>
    );

  }

}

export default Topic;
