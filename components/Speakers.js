import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';
import Speaker from './Speaker';
import AddSpeaker from './AddSpeaker'

import './Speakers.css';

class Speakers extends React.PureComponent {

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

  state = {
    speakers: this.props.speakers,
    mode: null, //0 -view, 1- edit, 2 -add
  }

  componentDidMount = () => {
    voteEvents.addListener('ESave',this.speakerSave);
    voteEvents.addListener('ECancel',this.speakerCancel);
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('ESave',this.speakerSave);
    voteEvents.removeListener('ECancel',this.speakerCancel);
  };

  speakerSave = (id, name, phone, position, topic) => {
    let speakers = [...this.state.speakers];
    if (this.state.mode===1) {
      speakers.forEach( (c, i) => {
        if (c.id == id) {
          let speaker={...c};
          speaker.name = name;
          speaker.phone = phone;
          speaker.position = position;
          speaker.topic = topic;
          speakers[i]=speaker;
        }
      })
    }; 
    if (this.state.mode===2) {
        let newObject = {id:speakers.length+2, name: name, phone: phone, position: position, topic: topic}; 
        speakers = [...speakers, newObject];
    }
    this.setState({ mode:0, speakers: speakers});
  };

  speakerCancel = () => {
    let speakers = [...this.state.speakers];
    this.setState({mode:0, speakers: speakers});
  }

  addSpeaker = (EO) => {
    this.setState({mode:2})
  }
  
  render() {
    let speakers = [...this.state.speakers];
    var speakersCode=speakers.map( speaker =>
      <Speaker key={speaker.id} speaker={speaker}  />
    );

    return (
      <div>
        <div>Speakers</div>
        <table>
        <thead>
              <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Position</th>
                  <th>Topic</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody>
          {speakersCode}
          </tbody>
        </table>
        <input type="button" value="I want to be a speaker" onClick = {this.addSpeaker} disabled = {(this.state.mode===2)?true:false}/>

        {
        (this.state.mode===2)&&
        <AddSpeaker key={this.state.speakers.length+2}
        mode={this.state.mode}
        id={this.state.speakers.length+2}
        name=''
        phone=''
        position=''
        topic=''/>
      }

      </div>
    )
    ;

  }

}

export default Speakers;
