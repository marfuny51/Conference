import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

import './Member.css';

class EditMember extends React.PureComponent {

  static propTypes = {
    member:PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        job: PropTypes.string.isRequired,
    }),
  };

  state = {
    newName: this.props.name,
    newPhone: this.props.phone,
    newEmail: this.props.email,
    newJob: this.props.job,
    errorName:'',
    errorPhone:'',
    errorEmail: '',
    errorJob:'',
    valideName: true,
    validePhone: true,
    valideEmail: true,
    valideJob: true,
  }

  componentDidMount() {
    if (!this.state.newName.match(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)) {
        this.setState({errorName:'Name should includes only letters!', valideName: false}); 
    }
    else {
        this.setState({errorName:'', valideName: true});
    } 
    if (!this.state.newPhone.match(/(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/)) {
        this.setState({errorPhone:'Phone should be the same form: +375291112233', validePhone: false}); 
    }
    else {
        this.setState({errorPhone:'', validePhone: true});
    } 
    if (!this.state.newEmail.match(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/)) {
      this.setState({errorEmail:'Email should be like hor@mail.com!', valideEmail: false}); 
    }
    else {
      this.setState({errorEmail:'', valideEmail: true});
    }
    if (!this.state.newJob.match(/^.{2,}/)) {
        this.setState({errorJob:'Your job should includes not less then 2 letters!', valideJob: false}); 
    }
    else {
        this.setState({errorJob:'', valideJob: true});
    } 
  }

  setNewName = (EO) => {
    if(this.props.name!==EO.target.value) {
      this.setState({newName: EO.target.value}, this.errorName);
    }
    else {
      this.setState({newName:this.props.name}, this.errorName);
    }  
  }

  setNewPhone = (EO) => {
    if(this.props.phone!==EO.target.value) {
        this.setState({newPhone: EO.target.value}, this.errorPhone);
    }
    else {
        this.setState({newPhone:this.props.phone}, this.errorPhone);
    } 
  }

  setNewEmail = (EO) => {
    if(this.props.email!==EO.target.value) {
        this.setState({newEmail: EO.target.value}, this.errorEmail);
    }
    else {
        this.setState({newEmail:this.props.email}, this.errorEmail);
    } 
  }

  setNewJob = (EO) => {
    if(this.props.job!==EO.target.value) {
        this.setState({newJob: EO.target.value}, this.errorJob);
    }
    else {
        this.setState({newJob:this.props.job}, this.errorJob);
    } 
  }

  errorName = () => {
    if (!this.state.newName.match(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)) {
        this.setState({errorName:'Name should includes only letters!', valideName: false}); 
    }
    else {
        this.setState({errorName:'', valideName: true});
    }
  }

  errorPhone = () => {
    if (!this.state.newPhone.match(/(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/)) {
        this.setState({errorPhone:'Phone should be the same form: +375291112233', validePhone: false}); 
    }
    else {
        this.setState({errorPhone:'', validePhone: true});
    } 
  }

  errorEmail = () => {
    if (!this.state.newEmail.match(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/)) {
        this.setState({errorEmail:'Email should be like hor@mail.com!', valideEmail: false}); 
    }
    else {
        this.setState({errorEmail:'', valideEmail: true});
    } 
  }

  errorJob = () => {
    if (!this.state.newJob.match(/^.{2,}/)) {
        this.setState({errorJob:'Your job should includes not less then 2 letters!', valideJob: false}); 
    }
    else {
        this.setState({errorJob:'', valideJob: true});
    } 
  }

  saveMember = () => {
      let name=this.state.newName;
      let phone=this.state.newPhone;
      let email=this.state.newEmail;
      let job=this.state.newJob;
      voteEvents.emit('EEditSaveMember', this.props.id, name, phone, email, job);
    }
  

  cancelMember = () => {
    let question = confirm('Are you sure you do not want to save the changes?');
    if(question) {
      voteEvents.emit('ECancelMember');
    }
  }

  render() {
    
    return (
          <div key = {this.props.id} className = 'AddMember'>
            <div className='Title'>Please, edit info</div>
            <div className='Input'>
              <span>Name: </span><input type='text' defaultValue={this.props.name} onChange={this.setNewName}/><span className='Valide'>{this.state.errorName}</span><br/>
              <span>Phone: </span><input type='text'defaultValue={this.props.phone} onChange={this.setNewPhone}/><span className='Valide'>{this.state.errorPhone}</span><br/>
              <span>Email: </span><input type='text'defaultValue={this.props.email} onChange={this.setNewEmail}/><span className='Valide'>{this.state.errorEmail}</span><br/>
              <span>Job: </span><input type='text' defaultValue={this.props.job} onChange={this.setNewJob}/><span className='Valide'>{this.state.errorJob}</span><br/>
            </div>
            <input type="button" value="Save" className='Read2' onClick={this.saveMember} disabled = {(this.state.valideName&&this.state.validePhone&&this.state.valideEmail&&this.state.valideJob)?false:true}/>
            <input type="button" value="Cancel" className='Read2' onClick={this.cancelMember}/>
          </div>
    );
  }
}

export default EditMember;
