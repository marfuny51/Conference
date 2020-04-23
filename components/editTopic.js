import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

//import './editadd.css';

class EditTopic extends React.PureComponent {

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
    newTitle: this.props.title,
    newMainWords: this.props.mainWords,
    newAuthor: this.props.author,
    newInfo: this.props.info,
    errorTitle:'',
    errorMainWords:'',
    errorAuthor: '',
    errorInfo:'',
    valideTitle: true,
    valideMainWords: true,
    valideAuthor: true,
    valideInfo: true,
    changeProduct: false,
  }

  componentDidMount() {
    if (!this.state.newTitle.match(/^[A-Za-z0-9]{3,}/)) {
        this.setState({errorTitle:'Title should includes more then 3 letters!', valideTitle: false}); 
    }
    else {
        this.setState({errorTitle:'', valideTitle: true});
    } 
    if (!this.state.newMainWords.match(/^[A-Za-z0-9]{3,}/)) {
        this.setState({errorMainWords:'Key words should includes more then 20 letters!', valideMainWords: false}); 
    }
    else {
        this.setState({errorMainWords:'', valideMainWords: true});
    } 
    if (!this.state.newAuthor.match(/^[A-Za-z]+$/)) {
      this.setState({errorAuthor:'Name should includes only letters!', valideAuthor: false}); 
    }
    else {
      this.setState({errorAuthor:'', valideAuthor: true});
    }
    if (!this.state.newInfo.match(/^[A-Za-z0-9]{3,}/)) {
        this.setState({errorInfo:'Info should includes more then 30 letters!', valideInfo: false}); 
    }
    else {
        this.setState({errorInfo:'', valideInfo: true});
    } 
  }

  setNewAuthor = (EO) => {
    if(this.props.author!==EO.target.value) {
      this.setState({newAuthor: EO.target.value, changeProduct: true}, this.errorAuthor);
    }
    else {
      this.setState({newAuthor:this.props.author, changeProduct: false}, this.errorAuthor);
    }  
  }

  setNewTitle = (EO) => {
    if(this.props.title!==EO.target.value) {
        this.setState({newTitle: EO.target.value, changeProduct: true}, this.errorTitle);
    }
    else {
        this.setState({newTitle:this.props.title, changeProduct: false}, this.errorTitle);
    } 
  }

  setNewMainWords = (EO) => {
    if(this.props.mainWords!==EO.target.value) {
        this.setState({newMainWords: EO.target.value, changeProduct: true}, this.errorMainWords);
    }
    else {
        this.setState({newMainWords:this.props.mainWords, changeProduct: false}, this.errorMainWords);
    } 
  }

  setNewInfo = (EO) => {
    if(this.props.info!==EO.target.value) {
        this.setState({newInfo: EO.target.value, changeProduct: true}, this.errorInfo);
    }
    else {
        this.setState({newInfo:this.props.info, changeProduct: false}, this.errorInfo);
    } 
  }

  errorAuthor = () => {
    if (!this.state.newAuthor.match(/^[A-Za-z]+$/)) {
        this.setState({errorAuthor:'Name should includes only letters!', valideAuthor: false}); 
    }
    else {
        this.setState({errorAuthor:'', valideAuthor: true});
    }
  }

  errorTitle = () => {
    if (!this.state.newTitle.match(/^[A-Za-z0-9]{3,}/)) {
        this.setState({errorTitle:'Title should includes more then 3 letters!', valideTitle: false}); 
    }
    else {
        this.setState({errorTitle:'', valideTitle: true});
    } 
  }

  errorMainWords = () => {
    if (!this.state.newMainWords.match(/^[A-Za-z0-9]{3,}/)) {
        this.setState({errorMainWords:'Key words should includes more then 20 letters!', valideMainWords: false}); 
    }
    else {
        this.setState({errorMainWords:'', valideMainWords: true});
    } 
  }

  errorInfo = () => {
    if (!this.state.newInfo.match(/^[A-Za-z0-9]{3,}/)) {
        this.setState({errorInfo:'Info should includes more then 30 letters!', valideInfo: false}); 
    }
    else {
        this.setState({errorInfo:'', valideInfo: true});
    } 
  }

  saveTopic = () => {
    this.state.changeProduct = false;
      let title=this.state.newTitle;
      let mainWords=this.state.newMainWords;
      let author=this.state.newAuthor;
      let info=this.state.newInfo;
      voteEvents.emit('EditSaveTopic', this.props.id, title, mainWords, author, info);
    }
  

  cancelTopic = () => {
    voteEvents.emit('ECancelTopic');
  }

  render() {
    
    return (
          <div key = {this.props.id}>
            <span>Please, edit info</span><br/>
            <span>Title: </span><input type='text' defaultValue={this.props.title} onChange={this.setNewTitle}/><span>{this.state.errorTitle}</span><br/>
            <span>Key words: </span><input type='text'defaultValue={this.props.mainWords} onChange={this.setNewMainWords}/><span>{this.state.errorMainWords}</span><br/>
            <span>Author: </span><input type='text'defaultValue={this.props.author} onChange={this.setNewAuthor}/><span>{this.state.errorAuthor}</span><br/>
            <span>Info: </span><textarea defaultValue={this.props.info} onChange={this.setNewInfo}/><span>{this.state.errorInfo}</span><br/>
            <input type="button" value="Save" onClick={this.saveTopic} disabled = {(this.state.valideTitle&&this.state.valideAuthor&&this.state.valideMainWords&&this.state.valideInfo)?false:true}/>
            <input type="button" value="Cancel" onClick={this.cancelTopic}/>
          </div>
    );
  }
}

export default EditTopic;
