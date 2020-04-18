import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {voteEvents} from './events';
import isoFetch from 'isomorphic-fetch';
import Speaker from './Speaker';
import AddSpeaker from './AddSpeaker'

import './Speakers.css';

class Speakers extends React.PureComponent {

  state = {
    dataReady: false,
    speakers: [],
    mode: null, //0 -view, 1- edit, 2 -add
  }

  componentDidMount = () => {
    this.loadData();
    voteEvents.addListener('ESave',this.speakerSave);
    voteEvents.addListener('ECancel',this.speakerCancel);
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('ESave',this.speakerSave);
    voteEvents.removeListener('ECancel',this.speakerCancel);
  };

  loadData = () => {
    let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'NAKVAS_PROJECT_CONFERENCE');

    isoFetch(ajaxHandlerScript, {
        method: 'post',
        headers: {
            "Accept": "application/json",
        },
        bode: sp,
    })
        .then( response => { // response - HTTP-ответ
            if (!response.ok)
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            else
                return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
        })
        .then( data => {
            this.fetchSuccess(data);
            console.log(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        })
        .catch( error => {
            this.fetchError(error.message);
        });

  }; 
  
  fetchSuccess = (loadedData) => {
    if (loadedData.error != undefined)
    alert(loadedData.error);
  else {
    this.setState({
      dataReady:true,
      speakers:[],
    });
    if (loadedData.result != "") { // либо строка пустая - сообщений нет
      // либо в строке - JSON-представление массива сообщений
      this.setState({
        dataReady:true,
        speakers:JSON.parse(loadedData.result),
      });
    }
  }  

  };


  fetchError = (errorMessage) => {
    //console.error(showStr);
  };

  speakerSave = (id, name, phone, position, topic) => {
    let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let updatePassword=Math.random();
    let sp1 = new URLSearchParams();
    sp1.append('f', 'LOCKGET');
    sp1.append('n', 'NAKVAS_PROJECT_CONFERENCE');
    sp1.append('p', updatePassword);
    
    isoFetch(ajaxHandlerScript, {
      method: 'post',
      headers: {
          "Accept": "application/json",
      },
      bode: sp1,
    })
      .then( response => { // response - HTTP-ответ
          if (!response.ok)
              throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
          else
              return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
      })
      .then( data => {
        console.log(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
      })
      .catch( error => {
          console.log(error.message);
      });
      
    let sp2 = new URLSearchParams();
    sp2.append('f', 'UPDATE');
    sp2.append('n', 'NAKVAS_PROJECT_CONFERENCE');
    sp2.append('p', updatePassword);
    sp2.append('v', JSON.stringify(this.state.speakers));
    let speakers = JSON.parse(data);
    
    speakers.push({speakers: {id: id, name: name, phone: phone, position: position, topic: topic}});
    this.setState({speakers:speakers});

    isoFetch(ajaxHandlerScript, {
      method: 'post',
      headers: {
          "Accept": "application/json",
      },
      bode: sp2,
    })
      .then( response => { // response - HTTP-ответ
          if (!response.ok)
              throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
          else
              return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
      })
      .then( data => {
        console.log(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
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
  
  
  render() {
    /*if ( !this.state.dataReady )
      return <div>загрузка данных...</div>;*/

    let speakers = [...this.state.speakers];
    
    var speakersCode=speakers.map( speaker =>
      <Speaker key={speaker.id} 
      mode={this.state.mode}
      speaker={speaker}  />
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
        <input type="button" value="Add a new speaker" onClick = {this.addSpeaker} disabled = {(this.state.mode===2)?true:false}/>

        {
        (this.state.mode===2)&&
        <AddSpeaker key={1}
        mode={this.state.mode}
        id={1}
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
