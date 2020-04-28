import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';
import isoFetch from 'isomorphic-fetch';
import Speaker from './Speaker';
import AddSpeaker from './addSpeaker';
import EditSpeaker from './editSpeaker';

import './Speaker.css';

class Speakers extends React.PureComponent {
  
  /*constructor(props) {
    super(props);
    this.mounted = false;
  }*/

  state = {
    dataReady: false,
    speakers: [],
    className: 'TableSpeaker',
    editCode: null,
    mode: null, //0 -view, 1- edit, 2 -add
  }

  speakersArray;

  componentDidMount = () => {
    this.loadData();
    //this.mounted = true;
    voteEvents.addListener('ESave',this.speakerSave);
    voteEvents.addListener('ECancel',this.speakerCancel);
    voteEvents.addListener('EDelete',this.delete);
    voteEvents.addListener('EEdit',this.editSpeaker);
    voteEvents.addListener('EditSave',this.speakerSave);     
  };

  componentWillUnmount = () => {
    //this.mounted = false;
    voteEvents.removeListener('ESave',this.speakerSave);
    voteEvents.removeListener('ECancel',this.speakerCancel);
    voteEvents.removeListener('EDelete',this.delete);
    voteEvents.removeListener('EEdit',this.editSpeaker);
    voteEvents.removeListener('EditSave',this.speakerSave);
  };

  loadData = () => {
    let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'PROBA_PERA7');

    isoFetch(ajaxHandlerScript, {
        method: 'post',
        headers: {
            "Accept": "application/json",
        },
        body: sp,
    })
        .then( response => { 
            if (!response.ok)
                throw new Error("fetch error " + response.status); 
            else
                return response.json(); 
        })
        .then( data => {
            if (data.result === "") {
              this.speakersArray = {};
              this.speakersArray.speakers = [];
              this.speakersArray.topics = [];
              this.speakersArray.members = [];
            }
            else this.speakersArray = JSON.parse(data.result);
            console.log(this.speakersArray.speakers);
            
              this.setState({ dataReady:true, speakers:this.speakersArray.speakers, className:'TableTopic'});
            
        })
        .catch( error => {
            this.fetchError(error.message);
        });

  }; 

  fetchError = (errorMessage) => {
    console.error(showStr);
  };

  speakerSave = (id, name, phone, position, topic) => {
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    var updatePassword=Math.random();
    let sp1 = new URLSearchParams();
    sp1.append('f', 'LOCKGET');
    sp1.append('n', 'PROBA_PERA7');
    sp1.append('p', updatePassword);
    
    isoFetch(ajaxHandlerScript, {
      method: 'post',
      headers: {
          "Accept": "application/json",
      },
      body: sp1,
    })
      .then( response => { 
          if (!response.ok)
              throw new Error("fetch error " + response.status); 
          else
              return response.json(); 
      })
      .then( data => {
        if (data.result.speakers === undefined||data.result.speakers==='') {
          this.speakersArray.speakers =[];
        }
        else this.speakersArray.speakers = JSON.parse(data.result.speakers);
      })
      .catch( error => {
          console.log(error.message);
      });
    
      if (this.state.mode === 1) {
        console.log(name, phone, position, topic);
        this.speakersArray.speakers.forEach( speaker => {
          if (speaker.id === id) {
            speaker.name = name;
            speaker.phone = phone;
            speaker.position = position;
            speaker.topic = topic;
          }
        })
      }

      else if (this.state.mode === 2) {
        this.speakersArray.speakers.push({id: id, name: name, phone: phone, position: position, topic: topic});
        console.log(this.speakersArray);
      }

    let sp2 = new URLSearchParams();
    sp2.append('f', 'UPDATE');
    sp2.append('n', 'PROBA_PERA7');
    sp2.append('p', updatePassword);
    sp2.append('v', JSON.stringify(this.speakersArray));

    isoFetch(ajaxHandlerScript, {
      method: 'post',
      headers: {
          "Accept": "application/json",
      },
      body: sp2,
    })
      .then( response => { 
          if (!response.ok)
              throw new Error("fetch error " + response.status); 
          else
              return response.json(); 
      })
      .then( (data) => {
        console.log(data);
        this.loadData();
        this.setState({mode:0});        
      })
      .catch( error => {
          this.fetchError(error.message);
      });
    }

    delete = (id) => {
      var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
      var updatePassword=Math.random();
      let sp3 = new URLSearchParams();
      sp3.append('f', 'LOCKGET');
      sp3.append('n', 'PROBA_PERA7');
      sp3.append('p', updatePassword);
      
      isoFetch(ajaxHandlerScript, {
        method: 'post',
        headers: {
            "Accept": "application/json",
        },
        body: sp3,
      })
        .then( response => { 
            if (!response.ok)
                throw new Error("fetch error " + response.status); 
            else
                return response.json(); 
        })
        .then( data => {
            if (data.result.speakers === undefined||data.result.speakers==='') {
              this.speakersArray.speakers =[];
            }
            else this.speakersArray.speakers = JSON.parse(data.result.speakers);
        })
        .catch( error => {
            console.log(error.message);
        });
      
      this.speakersArray.speakers = this.speakersArray.speakers.filter(speaker => speaker.id !== id);
      console.log(this.speakersArray);
  
      let sp2 = new URLSearchParams();
      sp2.append('f', 'UPDATE');
      sp2.append('n', 'PROBA_PERA7');
      sp2.append('p', updatePassword);
      sp2.append('v', JSON.stringify(this.speakersArray));
  
      isoFetch(ajaxHandlerScript, {
        method: 'post',
        headers: {
            "Accept": "application/json",
        },
        body: sp2,
      })
        .then( response => { 
            if (!response.ok)
                throw new Error("fetch error " + response.status); 
            else
                return response.json(); 
        })
        .then( (data) => {
            console.log(data);
            this.loadData();
        })
        .catch( error => {
            this.fetchError(error.message);
        });
      }
  

  speakerCancel = () => {
    let speakers = [...this.state.speakers];
    this.setState({mode:0, speakers: speakers, className:'TableTopic'});
  }

  addSpeaker = (EO) => {
    this.setState({mode:2, className:'TableTopicAdd'})
  }
  
  editSpeaker = (id) => {
    this.setState( {editCode:id, mode:1, className:'TableTopicAdd'})
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  render() {
    if ( !this.state.dataReady )
      return <div className = 'LoadData'>загрузка данных...</div>;

    let speakers = [...this.state.speakers];
    let speakers2 = [...this.state.speakers];

    var speakersCode=speakers.map( speaker =>
      <Speaker key={speaker.id} 
      mode={this.state.mode}
      speaker={speaker}  />
    );
    var editCode = speakers2.find( speaker => speaker.id === this.state.editCode); 

    return (
      <div className='Table'>
        <table className={this.state.className}>
        <colgroup>
        <col className="cols1"/>
        <col span="2" className="cols2"/>
        <col className="cols3"/>
        <col span="2" className="cols4"/>
        </colgroup>
        <thead className='TableHead'>
              <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Position</th>
                  <th>Topic</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody className='TableBody'>
          {speakersCode}
          </tbody>
        </table>
        <input type="button" value="Add a new speaker" className='Add' onClick = {this.addSpeaker} disabled = {(this.state.mode===2)?true:false}/>

      {
        (this.state.mode===2)&&
        <AddSpeaker key={this.getRandomInt(1, 10000)}
        mode={this.state.mode}
        id={this.getRandomInt(1, 10000)}
        name=''
        phone=''
        position=''
        topic=''/>
      }

      {
        (this.state.mode===1)&&
        <EditSpeaker key={editCode.id}
        mode={this.state.mode}
        id={editCode.id}
        name= {editCode.name}
        phone={editCode.phone}
        position={editCode.position}
        topic={editCode.topic}/>
      }

      </div>
    )
    ;

  }

}

export default Speakers;
