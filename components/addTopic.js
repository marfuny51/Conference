import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

//import './editadd.css';

class AddTopic extends React.PureComponent {

  static propTypes = {
    topic:PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      mainWords: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
    }),
  };

  state = {
    newName: '',
    newTitle: '',
    newMainWords: '',
    newInfo: '',
    errorName: '',
    errorTitle:'',
    errorMainWords:'',
    errorInfo:'',
    valideName: true,
    valideTitle: true,
    valideMainWords: true,
    valideInfo: true,
  }

  componentDidMount() {
    if (!this.state.newName.match(/^[A-Za-z]+$/)) {
        this.setState({errorName:'Name should includes only letters!', valideName: false}); 
    }
    else {
        this.setState({errorName:'', valideName: true});
    }
    if (!this.state.newTitle.match(/^[a-fA-F0–9]{3,}/)) {
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
}

  setNewName = (EO) => {
    this.setState({newName: EO.target.value}, this.error);
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

  error = () => {
    if (!this.state.newName.match(/^[A-Za-z]+$/)) {
        this.setState({errorName:'Name should includes only letters!', valideName: false}); 
    }
    else {
        this.setState({errorName:'', valideName: true});
    }
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
  }

  save = () => {
      let title=this.state.newTitle;
      let mainWords=this.state.newMainWords;
      let author=this.state.newName;
      let info=this.state.newInfo;
      voteEvents.emit('ESave', this.props.id, title, mainWords, author, info);
  }

  cancel = () => {
    voteEvents.emit('ECancel');
  }

  render() {
    
    return (
        <div key = {this.props.id}>
            <span>Please, enter info</span><br/>
            <span>Title: </span><input type='text' defaultValue={this.props.title} onChange={this.setNewTitle}/><span>{this.state.errorTitle}</span><br/>
            <span>Key words: </span><input type='text'defaultValue={this.props.mainWords} onChange={this.setNewMainWords}/><span>{this.state.errorMainWords}</span><br/>
            <span>Author: </span><input type='text'defaultValue={this.props.author} onChange={this.setNewName}/><span>{this.state.errorName}</span><br/>
            <span>Info: </span><textarea defaultValue={this.props.info} onChange={this.setNewInfo}/><span>{this.state.errorInfo}</span><br/>
            <input type="button" value="Save" onClick={this.save} disabled = {(this.state.valideTitle&&this.state.valideName&&this.state.valideMainWords&&this.state.valideInfo)?false:true}/>
            <input type="button" value="Cancel" onClick={this.cancel}/>
        </div>
    );

  }

}

export default AddTopic;
