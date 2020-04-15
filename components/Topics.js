import React from 'react';
import PropTypes from 'prop-types';

import Topic from './Topic';

import './Topics.css';

class Topics extends React.PureComponent {

  static propTypes = {
    topics:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        mainWords: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      })
    ),
  };
  
  render() {

    var topicsCode=this.props.topics.map( topic =>
      <Topic key={topic.id} info={topic}  />
    );

    return (
      <div>
        <div>Topics</div>
        <table>
        <thead>
              <tr>
                  <th>Title</th>
                  <th>Key words</th>
                  <th>Author</th>
                  <th>Info</th>
              </tr>
          </thead>
          <tbody>
          {topicsCode}
          </tbody>
        </table>
      </div>
    )
    ;

  }

}

export default Topics;
