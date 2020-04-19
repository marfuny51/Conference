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
        info: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    topics: this.props.topics,
    mode: null, //3- edit, 4 -add, 5- view
  }

  componentDidMount = () => {
    voteEvents.addListener('ESave',this.topicSave);
    voteEvents.addListener('ECancel',this.topicCancel);
  };

  componentWillMount = () => {
    voteEvents.removeListener('ESave',this.topicSave);
    voteEvents.removeListener('ECancel',this.topicCancel);
  };

  topicSave = (id, title, mainWords, author, info) => {
    let topics = [...this.state.topics];
    if (this.state.mode===3) {
      topics.forEach( (c, i) => {
        if (c.id == id) {
          let topic={...c};
          topic.title = title;
          topic.mainWords = mainWords;
          topic.author = author;
          topic.info = info;
          topics[i]=topic;
        }
      })
    }; 
    if (this.state.mode===4) {
        let newObject = {id:topics.length+2, title: title, mainWords: mainWords, author: author, info: info}; 
        topics = [...topics, newObject];
    }
    this.setState({ mode:0, topics: topics});
  };

  topicCancel = () => {
    let topics = [...this.state.topics];
    this.setState({mode:5, topics: topics});
  }

  addSpeaker = (EO) => {
    this.setState({mode:4})
  }
  
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
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody>
          {topicsCode}
          </tbody>
        </table>
        <input type="button" value="Add a new topic" onClick = {this.addSpeaker} disabled = {(this.state.mode===4)?true:false}/>
        {
        (this.state.mode===4)&&
        <AddSpeaker key={this.state.topics.length+2}
        mode={this.state.mode}
        id={this.state.topics.length+2}
        title=''
        mainWords=''
        author=''
        />
      }
      
      </div>
    )
    ;

  }

}

export default Topics;
