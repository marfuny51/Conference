import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';
import isoFetch from 'isomorphic-fetch';
import Member from './Member';
import AddMember from './addMember';
import EditMember from './editMember';

import './Member.css';

class Members extends React.PureComponent {

  constructor(props) {
    super(props);
    this.mounted = false;
  }

  state = {
    dataReady: false,
    members: [],
    editCode: null,
    mode: null, //6 - view, 7 - edit, 8- add
    className: 'TableMember',
    optionValue: 1,
  }

  membersArray;

  componentDidMount = () => {
    this.loadData();
    this.mounted = true;
    voteEvents.addListener('ESaveMember',this.memberSave);
    voteEvents.addListener('ECancelMember',this.memberCancel);
    voteEvents.addListener('EDeleteMember',this.delete);
    voteEvents.addListener('EEditMember',this.memberEdit);
    voteEvents.addListener('EEditSaveMember',this.memberSave);     
  };

  componentWillUnmount = () => {
    this.mounted = false;
    voteEvents.removeListener('ESaveMember',this.memberSave);
    voteEvents.removeListener('ECancelMember',this.memberCancel);
    voteEvents.removeListener('EDeleteMember',this.delete);
    voteEvents.removeListener('EEditMember',this.memberEdit);
    voteEvents.removeListener('EEditSaveMember',this.memberSave);
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
            console.log(this.speakersArray.members);
            if (this.mounted) {
              this.setState({ dataReady:true, members:this.speakersArray.members, className:'TableMember'});
            }
        })
        .catch( error => {
            this.fetchError(error.message);
        });

  }; 

  fetchError = (errorMessage) => {
    console.error(showStr);
  };

  memberSave = (id, name, phone, email, job) => {
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
            this.speakersArray.members = [];
          }
          if (data.result.members === undefined||data.result.members==='') {
            this.speakersArray.members =[];
          }
          else this.speakersArray.members = JSON.parse(data.result.members);
      })
      .catch( error => {
          console.log(error.message);
      });
    
      if (this.state.mode === 7) {
        console.log(name, phone, email, job);
        this.speakersArray.members.forEach( member => {
          if (member.id === id) {
            member.name = name;
            member.phone = phone;
            member.email = email;
            member.job = job;
          }
        })
      }

      else if (this.state.mode === 8) {
        this.speakersArray.members.push({id: id, name: name, phone: phone, email: email, job: job});
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
        this.setState({mode:6});
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
              this.speakersArray.members = [];
            }
            if (data.result.members === undefined||data.result.members==='') {
              this.speakersArray.members =[];
            }
            else this.speakersArray = JSON.parse(data.result);
        })
        .catch( error => {
            console.log(error.message);
        });
      
      this.speakersArray.members = this.speakersArray.members.filter(member => member.id !== id);
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
    

  memberCancel = () => {
    let members = [...this.state.members];
    this.setState({mode:6, members: members, className: 'TableMember'});
  }

  addMember = (EO) => {
    this.setState({mode:8, className: 'TableMemberAdd'})
  }

  memberEdit = (id) => {
    this.setState( {editCode:id, mode:7, className: 'TableMemberAdd'})
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  select = (EO) => {
    if(EO.target.value === '1') {
      this.setState({optionValue:1});
    }
    if(EO.target.value === '2') {
      this.setState({optionValue:2});
    }
    if(EO.target.value === '3') {
      this.setState({optionValue:3});
    }
  }
  
  render() {
    if ( !this.state.dataReady )
      return <div className = 'LoadData'>загрузка данных...</div>;
    
    let members = [...this.state.members];

    if (this.state.optionValue===1) {
      members = members.slice(0, 5);
    }

    if (this.state.optionValue===2) {
      members = members.slice(5, 10);
    }

    if (this.state.optionValue===3) {
      members = members.slice(10, 20);
    }

    var membersCode=members.map( member =>
      <Member key={member.id} 
      mode={this.state.mode}
      member={member}  />
    );

    var editCode = members.find( member => member.id === this.state.editCode); 

    return (
      <div className='Table'>
        <table className={this.state.className}>
        <thead className='TableHead'>
              <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Job</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody className='TableBody'>
          {membersCode}
          </tbody>
        </table>
        <span className='SelectSpan'>Перейти на страницу: </span>
        <select name='Pages' onChange={this.select} className='Select'>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select><br/><br/>
        <input type="button" value="Add a new member" className='Add' onClick = {this.addMember} disabled = {(this.state.mode===8)?true:false}/>
        {
        (this.state.mode===8)&&
          <AddMember key={this.getRandomInt(1, 10000)}
          mode={this.state.mode}
          id={this.getRandomInt(1, 10000)}
          name=''
          phone=''
          email=''
          job=''
        />
        }
        {
        (this.state.mode===7)&&
          <EditMember key={editCode.id}
          mode={this.state.mode}
          id={editCode.id}
          name= {editCode.name}
          phone={editCode.phone}
          email={editCode.email}
          job={editCode.job}/>
        }
      
      </div>
    )
    ;

  }

}

export default Members;
