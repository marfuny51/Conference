import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

import './Speaker.css';

class AddSpeaker extends React.PureComponent {

  static propTypes = {
    speaker:PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
    }),
  };

  state = {
    newName: '',
    newPhone: '',
    newPosition: '',
    newTopic: '',
    errorName: '',
    errorPhone: '',
    errorPosition: '',
    errorTopic: '',
    valideName: true,
    validePhone: true,
    validePosition: true,
    valideTopic: true,
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
    if (!this.state.newPosition.match(/^.{2,}/)) {
        this.setState({errorPosition:'Your position should includes not less then 2 letters!', validePosition: false}); 
    }
    else {
        this.setState({errorPosition:'', validePosition: true});
    }
    if (!this.state.newTopic.match(/^.{2,}/)) {
        this.setState({errorTopic:'Topic should includes not less then 2 letters!', valideTopic: false}); 
    }
    else {
        this.setState({errorTopic:'', valideTopic: true});
    } 
}

  setNewName = (EO) => {
    this.setState({newName: EO.target.value}, this.error);
  }

  setNewPhone = (EO) => {
    this.setState({newPhone: EO.target.value}, this.error);
  }

  setNewPosition = (EO) => {
    this.setState({newPosition: EO.target.value}, this.error);
  }

  setNewTopic = (EO) => {
    this.setState({newTopic: EO.target.value}, this.error);
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
    if (!this.state.newPosition.match(/^.{2,}/)) {
        this.setState({errorPosition:'Your position should includes not less then 2 letters!', validePosition: false}); 
    }
    else {
        this.setState({errorPosition:'', validePosition: true});
    }
    if (!this.state.newTopic.match(/^.{2,}/)) {
        this.setState({errorTopic:'Topic should includes not less then 2 letters!', valideTopic: false}); 
    }
    else {
        this.setState({errorTopic:'', valideTopic: true});
    }
  }

  save = () => {
    let name=this.state.newName;
    let phone=this.state.newPhone;
    let position=this.state.newPosition;
    let topic=this.state.newTopic;
    voteEvents.emit('ESave', this.props.id, name, phone, position, topic);
  }

  cancel = () => {
    let question = confirm('Are you sure you do not want to save the changes?');
    if(question) {
      voteEvents.emit('ECancel');
    }
  }

  render() {
    
    return (
      <div key = {this.props.id} className = 'AddSpeaker'>
        <div className='Title'>Please, enter info</div>
        <div className='Input'>
        <span>Name: </span><input type='text' defaultValue={this.props.name} onChange={this.setNewName}/><span className='Valide'>{this.state.errorName}</span><br/>
        <span>Phone: </span><input type='text'defaultValue={this.props.phone} onChange={this.setNewPhone}/><span className='Valide'>{this.state.errorPhone}</span><br/>
        <span>Position: </span><input type='text'defaultValue={this.props.position} onChange={this.setNewPosition}/><span className='Valide'>{this.state.errorPosition}</span><br/>
        <span>Topic: </span><input type='text'defaultValue={this.props.topic} onChange={this.setNewTopic}/><span className='Valide'>{this.state.errorTopic}</span><br/>
        </div>
        <input type="button" value="Save" className='Read2' onClick={this.save} disabled = {(this.state.valideName&&this.state.validePhone&&this.state.validePosition&&this.state.valideTopic)?false:true}/>
        <input type="button" value="Cancel" className='Read2' onClick={this.cancel}/>
      </div>
    );

  }

}

export default AddSpeaker;
