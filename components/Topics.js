import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';
import isoFetch from 'isomorphic-fetch';
import Topic from './Topic';
import AddTopic from './addTopic';
import EditSpeaker from './editSpeaker';

import './Topics.css';

class Topics extends React.PureComponent {

  /*constructor(props) {
    super(props);
    this.mounted = false;
  }*/

  state = {
    dataReady: false,
    topics: [],
    deleteCode: null,
    editCode: null,
    mode: null, //3- edit, 4 -add, 5- view
  }

  topicsArray;

  componentDidMount = () => {
    this.loadData();
    //this.mounted = true;
    voteEvents.addListener('ESave',this.topicSave);
    voteEvents.addListener('ECancel',this.topicCancel);
    voteEvents.addListener('EDelete',this.topicDelete);
    voteEvents.addListener('EEdit',this.editTopic);
    voteEvents.addListener('EditSave',this.topicSave);     
  };

  componentWillUnmount = () => {
    //this.mounted = false;
    voteEvents.removeListener('ESave',this.topicSave);
    voteEvents.removeListener('ECancel',this.topicCancel);
    voteEvents.removeListener('EDelete',this.topicDelete);
    voteEvents.removeListener('EEdit',this.editTopic);
    voteEvents.removeListener('EditSave',this.topicSave);
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
            console.log(this.speakersArray.topics);
            
              this.setState({ dataReady:true, topics:this.speakersArray.topics});
            
        })
        .catch( error => {
            this.fetchError(error.message);
        });

  }; 

  fetchError = (errorMessage) => {
    console.error(showStr);
  };

  topicSave = (id, title, mainWords, author, info) => {
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
          if (data.result === "") {
            this.speakersArray = {};
            this.speakersArray.topics = [];
          }
          else this.speakersArray.topics = JSON.parse(data.result.topics);
      })
      .catch( error => {
          console.log(error.message);
      });
    
      if (this.state.mode === 3) {
        console.log(title, mainWords, author, info);
        this.speakersArray.topics.forEach( topic => {
          if (topic.id === id) {
            topic.title = title;
            topic.mainWords = mainWords;
            topic.author = author;
            topic.info = info;
          }
        })
      }

      else if (this.state.mode === 4) {
        this.speakersArray.topics.push({id: id, title: title, mainWords: mainWords, author: author, info: info});
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
        this.setState({mode:5});
        
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
            if (data.result === "") {
              this.speakersArray = {};
              this.speakersArray.topics = [];
            }
            else this.speakersArray = JSON.parse(data.result);
        })
        .catch( error => {
            console.log(error.message);
        });
      
      this.speakersArray.topics = this.speakersArray.topics.filter(topic => topic.id !== id);
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
          
            this.loadData();
          
        })
        .catch( error => {
            this.fetchError(error.message);
        });
      }

  topicCancel = () => {
    let topics = [...this.state.topics];
    this.setState({mode:5, topics: topics});
  }

  addTopic = (EO) => {
    this.setState({mode:4})
  }

  topicDelete = (id) => {
    this.setState( {deleteCode:id}, this.delete);
  }

  editTopic = (id) => {
    this.setState( {editCode:id, mode:3})
  }
  
  render() {
    if ( !this.state.dataReady )
      return <div>загрузка данных...</div>;

    let topics = [...this.state.topics];
    let topics2 = [...this.state.topics];

    var topicsCode=topics.map( topic =>
      <Topic key={topic.id} 
      mode={this.state.mode}
      topic={topic}  />
    );

    var editCode = topics2.find( topic => topic.id === this.state.editCode); 

    let idNum = Math.random();

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
        <input type="button" value="Add a new topic" onClick = {this.addTopic} disabled = {(this.state.mode===4)?true:false}/>
        {
        (this.state.mode===4)&&
          <AddTopic key={idNum}
          mode={this.state.mode}
          id={idNum}
          title=''
          mainWords=''
          author=''
          info=''
        />
        }
        {
        (this.state.mode===3)&&
          <EditSpeaker key={editCode.id}
          mode={this.state.mode}
          id={editCode.id}
          title= {editCode.title}
          mainWords={editCode.mainWords}
          author={editCode.author}
          info={editCode.info}/>
        }
      
      </div>
    )
    ;

  }

}

export default Topics;
