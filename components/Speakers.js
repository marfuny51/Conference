import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {voteEvents} from './events';
import isoFetch from 'isomorphic-fetch';
import Speaker from './Speaker';
import AddSpeaker from './addSpeaker'
import EditSpeaker from './editSpeaker'

import './Speakers.css';

class Speakers extends React.PureComponent {

  state = {
    dataReady: false,
    speakers: [],
    deleteCode: null,
    editCode: null,
    mode: null, //0 -view, 1- edit, 2 -add
  }

  speakersArray;

  componentDidMount = () => {
    this.loadData();
    voteEvents.addListener('ESave',this.speakerSave);
    voteEvents.addListener('ECancel',this.speakerCancel);
    voteEvents.addListener('EDelete',this.speakerDelete);
    voteEvents.addListener('EEdit',this.editSpeaker);   
  };

  componentWillMount = () => {
    voteEvents.removeListener('ESave',this.speakerSave);
    voteEvents.removeListener('ECancel',this.speakerCancel);
    voteEvents.removeListener('EDelete',this.speakerDelete);
    voteEvents.removeListener('EEdit',this.editSpeaker);
  };

  loadData = () => {
    let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'PROBA_PERA');

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
              this.speakersArray = [];
            }
            else this.speakersArray = JSON.parse(data.result);
            this.setState({ dataReady:true, speakers:this.speakersArray});
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
    sp1.append('n', 'PROBA_PERA');
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
          if (data.result === "") {
            this.speakersArray = [];
            }
          else this.speakersArray = JSON.parse(data.result);
      })
      .catch( error => {
          console.log(error.message);
      });
    
      if (this.state.mode === 2) {
        this.speakersArray.push({id: id, name: name, phone: phone, position: position, topic: topic});
      }
      if (this.state.mode === 1) {
        this.speakersArray.forEach( (c, i) => {
          if (c.id == id) {
            let speaker={...c};
            speaker.surname = surname;
            speaker.name = name;
            speaker.otch = otch;
            speaker.balance = parseInt(balance);
            this.speakersArray[i]=speaker;
          }
        })
      }

    let sp2 = new URLSearchParams();
    sp2.append('f', 'UPDATE');
    sp2.append('n', 'PROBA_PERA');
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
        this.setState({mode:0});
        this.loadData();
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
      sp3.append('n', 'PROBA_PERA');
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
            if (data.result === "") {
              this.speakersArray = [];
              }
            else this.speakersArray = JSON.parse(data.result);
        })
        .catch( error => {
            console.log(error.message);
        });
      
      this.speakersArray = this.speakersArray.filter(speaker => speaker.id !== this.state.deleteCode);
      console.log(this.speakersArray);
  
      let sp2 = new URLSearchParams();
      sp2.append('f', 'UPDATE');
      sp2.append('n', 'PROBA_PERA');
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
          this.loadData();
        })
        .catch( error => {
            this.fetchError(error.message);
        });
      }
  

  speakerCancel = () => {
    let speakers = [...this.state.speakers];
    this.setState({mode:0, speakers: speakers});
  }

  addSpeaker = (EO) => {
    this.setState({mode:2})
  }

  speakerDelete = (id) => {
    this.setState( {deleteCode:id}, this.delete);
  }

  editSpeaker = (id) => {
    this.setState( {editCode:id, mode:1})
  }
  
  render() {
    if ( !this.state.dataReady )
      return <div>загрузка данных...</div>;

    let speakers = [...this.state.speakers];
    
    var speakersCode=speakers.map( speaker =>
      <Speaker key={speaker.id} 
      mode={this.state.mode}
      speaker={speaker}  />
    );
    var editCode = speakers.filter( speaker => speaker.id === this.state.editCode); 

    let idNum = Math.random();

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
        <input type="button" value="Add a new speaker" onClick = {this.addSpeaker} disabled = {(this.state.mode===2)?true:false}/>

      {
        (this.state.mode===2)&&
        <AddSpeaker key={idNum}
        mode={this.state.mode}
        id={idNum}
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
