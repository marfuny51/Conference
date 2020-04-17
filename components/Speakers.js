import React from 'react';
import PropTypes from 'prop-types';

import Speaker from './Speaker';

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

  addSpeaker() {
    
  }
  
  render() {

    var speakersCode=this.props.speakers.map( speaker =>
      <Speaker key={speaker.id} info={speaker}  />
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
              </tr>
          </thead>
          <tbody>
          {speakersCode}
          </tbody>
        </table>
        <input type="button" value="I want to be a speaker" onclick = {this.addSpeaker}/>
      </div>
    )
    ;

  }

}

export default Speakers;
