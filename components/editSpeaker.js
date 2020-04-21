import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

//import './editadd.css';

class EditSpeaker extends React.PureComponent {

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
    newName: this.props.name,
    newPhone: this.props.phone,
    newPosition: this.props.position,
    newTopic: this.props.topic,
    newTitle: '',
    newMainWords: '',
    newInfo: '',
    errorName: '',
    errorPhone: '',
    errorPosition: '',
    errorTopic: '',
    errorTitle:'',
    errorMainWords:'',
    errorInfo:'',
    valideName: true,
    validePhone: true,
    validePosition: true,
    valideTopic: true,
    valideTitle: true,
    valideMainWords: true,
    valideInfo: true,
    changeProduct: false,
  }

  componentDidMount() {
    if (!this.state.newName.match(/^[A-Za-z]+$/)) {
      this.setState({errorName:'Name should includes only letters!', valideName: false}); 
    }
    else {
      this.setState({errorName:'', valideName: true});
    }
    if (!this.state.newPhone.match(/[0-9]+$/)) {
      this.setState({errorPhone:'Phone should be the same form: +375(**)***-**-**', validePhone: false}); 
    }
    else {
      this.setState({errorPhone:'', validePhone: true});
    }
    if (!this.state.newPosition.match(/^[A-Za-z]+$/)) {
      this.setState({errorPosition:'Your position should includes only letters!', validePosition: false}); 
    }
    else {
      this.setState({errorPosition:'', validePosition: true});
    }
    if (!this.state.newTopic.match(/^[A-Za-z]+$/)) {
      this.setState({errorTopic:'Name of your topic should includes only letters!', valideTopic: false}); 
    }
    else {
      this.setState({errorTopic:'', valideTopic: true});
    }
  }

  setNewName = (EO) => {
    if(this.props.name!==EO.target.value) {
      this.setState({newName: EO.target.value, changeProduct: true}, this.errorName);
    }
    else {
      this.setState({newName:this.props.name, changeProduct: false}, this.errorName);
    }  
  }

  setNewPhone = (EO) => {
    if(this.props.phone!==EO.target.value) {
      this.setState({newPhone: EO.target.value, changeProduct: true}, this.errorPhone);
    }
    else {
      this.setState({newPhone: this.props.phone, changeProduct: false}, this.errorPhone);
    }  
  }

  setNewPosition = (EO) => {
    if(this.props.position!==EO.target.value) {
      this.setState({newPosition: EO.target.value, changeProduct: true}, this.errorPosition);
    }
    else {
      this.setState({newPosition: this.props.position, changeProduct: false}, this.errorPosition);
    }  
  }

  setNewTopic = (EO) => {
    if(this.props.topic!==EO.target.value) {
      this.setState({newTopic: EO.target.value, changeProduct: true}, this.errorTopic);
    }
    else {
      this.setState({newTopic: this.props.topic, changeProduct: false}, this.errorTopic);
    }  
  }

  setNewTitle = (EO) => {
    this.setState({newTitle: EO.target.value}, this.error);
  }

  setNewMainWords = (EO) => {
    this.setState({newMainWords: EO.target.value}, this.error);
  }

  setNewInfo = (EO) => {
    this.setState({newInfo: EO.target.value}, this.error);
  }

  errorName = () => {
    if (!this.state.newName.match(/^[A-Za-z]+$/)) {
        this.setState({errorName:'Name should includes only letters!', valideName: false}); 
    }
    else {
        this.setState({errorName:'', valideName: true});
    }
  }

  errorPhone = () => {
    if (!this.state.newPhone.match(/[0-9]+$/)) {
        this.setState({errorPhone:'Phone should be the same form: +375(**)***-**-**', validePhone: false}); 
    }
    else {
        this.setState({errorPhone:'', validePhone: true});
    }
  }

  errorPosition = () => {
    if (!this.state.newPosition.match(/^[A-Za-z]+$/)) {
        this.setState({errorPosition:'Your position should includes only letters!', validePosition: false}); 
    }
    else {
        this.setState({errorPosition:'', validePosition: true});
    }
  }

  errorTopic = () => {
    if (!this.state.newTopic.match(/^[A-Za-z]+$/)) {
        this.setState({errorTopic:'Name of your topic should includes only letters!', valideTopic: false}); 
    }
    else {
        this.setState({errorTopic:'', valideTopic: true});
    }
  }

  /*
    if (!this.state.newTitle.match(/^[A-Za-z0-9]{3,}/)) {
      this.setState({errorTitle:'Title should includes more then 3 letters!', valideTitle: false}); 
    }
    else {
      this.setState({errorTitle:'', valideTitle: true});
    } 
    if (!this.state.newMainWords.match(/^[A-Za-z0-9]{20,}/)) {
      this.setState({errorMainWords:'Key words should includes more then 20 letters!', valideMainWords: false}); 
    }
    else {
      this.setState({errorMainWords:'', valideMainWords: true});
    } 
    if (!this.state.newInfo.match(/^[A-Za-z0-9]{30,}/)) {
      this.setState({errorInfo:'Info should includes more then 30 letters!', valideInfo: false}); 
    }
    else {
      this.setState({errorInfo:'', valideInfo: true});
    } 
  }*/

  save = () => {
    this.state.changeProduct = false;
    if (this.props.mode ===1) {
      let name=this.state.newName;
      let phone=this.state.newPhone;
      let position=this.state.newPosition;
      let topic=this.state.newTopic;
      console.log(name, phone, position, topic);
      voteEvents.emit('EditSave', this.props.id, name, phone, position, topic);
    }
    /*if (this.props.mode ===4) {
      let title=this.state.newTitle;
      let mainWords=this.state.newMainWords;
      let author=this.state.newName;
      let info=this.state.newInfo;
      voteEvents.emit('ESave', this.props.id, title, mainWords, author, info);
    }*/
  }

  cancel = () => {
    voteEvents.emit('ECancel');
  }

  render() {
    
    return (
        
        <div>
          {
          (this.props.mode===1)&&
          <div key = {this.props.id}>
            <span>Please, edit info</span><br/>
            <span>Name: </span><input type='text' defaultValue={this.props.name} onChange={this.setNewName}/><span>{this.state.errorName}</span><br/>
            <span>Phone: </span><input type='text'defaultValue={this.props.phone} onChange={this.setNewPhone}/><span>{this.state.errorPhone}</span><br/>
            <span>Position: </span><input type='text'defaultValue={this.props.position} onChange={this.setNewPosition}/><span>{this.state.errorPosition}</span><br/>
            <span>Topic: </span><input type='text'defaultValue={this.props.topic} onChange={this.setNewTopic}/><span>{this.state.errorTopic}</span><br/>
            <input type="button" value="Save" onClick={this.save} disabled = {(this.state.valideName&&this.state.validePhone&&this.state.validePosition&&this.state.valideTopic)?false:true}/>
            <input type="button" value="Cancel" onClick={this.cancel}/>
            </div>
          }
           {
          (this.props.mode===4)&&
          <div key = {this.props.id}>
            <span>Please, edit info</span><br/>
            <span>Title: </span><input type='text' defaultValue={this.props.title} onChange={this.setNewTitle}/><span>{this.state.errorTitle}</span><br/>
            <span>Key words: </span><input type='text'defaultValue={this.props.mainWords} onChange={this.setNewMainWords}/><span>{this.state.errorMainWords}</span><br/>
            <span>Author: </span><input type='text'defaultValue={this.props.author} onChange={this.setNewName}/><span>{this.state.errorName}</span><br/>
            <span>Info: </span><textarea defaultValue={this.props.info} onChange={this.setNewInfo}/><span>{this.state.errorInfo}</span><br/>
            <input type="button" value="Save" onClick={this.save} disabled = {(this.state.valideTitle&&this.state.valideName&&this.state.valideMainWords&&this.state.valideInfo)?false:true}/>
            <input type="button" value="Cancel" onClick={this.cancel}/>
          </div>
      }

         
        
        </div>

        
 
    );

  }

}

export default EditSpeaker;
