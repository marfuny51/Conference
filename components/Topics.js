import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

import Topic from './Topic';
import AddSpeaker from './AddSpeaker'

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

  state = {
    topics: this.props.topics,
  }

  componentDidMount = () => {
    voteEvents.addListener('EAddTopic',this.topicSave);
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('EAddTopic',this.topicSave);
  };

  topicSave = (id, name, topic) => {
    let topics = [...this.state.topics];
      let newObject = {id:id, title: topic, mainWords: topic, author: name,}; 
      topics = [...topics, newObject];
    this.setState({ topics: topics});
  };
  
  render() {

    var topicsCode=this.state.topics.map( topic =>
      <Topic key={topic.id} topic={topic}  />
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
