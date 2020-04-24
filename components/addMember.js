import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

import './Member.css';

class AddMember extends React.PureComponent {

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
    newName: '',
    newPhone: '',
    newEmail: '',
    newJob: '',
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
    this.setState({newName: EO.target.value}, this.error);
  }

  setNewPhone = (EO) => {
    this.setState({newPhone: EO.target.value}, this.error);
  }

  setNewEmail = (EO) => {
    this.setState({newEmail: EO.target.value}, this.error);
  }

  setNewJob = (EO) => {
    this.setState({newJob: EO.target.value}, this.error);
  }

  error = () => {
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

  save = () => {
      let name=this.state.newName;
      let phone=this.state.newPhone;
      let email=this.state.newEmail;
      let job=this.state.newJob;
      voteEvents.emit('ESaveMember', this.props.id, name, phone, email, job);
  }

  cancel = () => {
    voteEvents.emit('ECancelMember');
  }

  render() {
    
    return (
        <div key = {this.props.id} className = 'AddMember'>
            <div className='Title'>Please, enter info</div>
            <div className='Input'>
              <span>Name: </span><input type='text' defaultValue={this.props.name} onChange={this.setNewName}/><span className='Valide'>{this.state.errorName}</span><br/>
              <span>Phone: </span><input type='text'defaultValue={this.props.phone} onChange={this.setNewPhone}/><span className='Valide'>{this.state.errorPhone}</span><br/>
              <span>Email: </span><input type='text'defaultValue={this.props.email} onChange={this.setNewEmail}/><span className='Valide'>{this.state.errorEmail}</span><br/>
              <span>Job: </span><input type='text'defaultValue={this.props.job} onChange={this.setNewJob}/><span className='Valide'>{this.state.errorJob}</span><br/>
            </div>
            <input type="button" value="Save" className='Read2' onClick={this.save} disabled = {(this.state.valideName&&this.state.validePhone&&this.state.valideEmail&&this.state.valideJob)?false:true}/>
            <input type="button" value="Cancel" className='Read2' onClick={this.cancel}/>
        </div>
    );

  }

}

export default AddMember;
