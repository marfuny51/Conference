import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from './events';

import './Member.css';

class Member extends React.PureComponent {

  static propTypes = {
    member:PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
    }),
  };

  deleteMember = () => {
    let question = confirm('Do you sure? You are going to delete this information.');
    if(question) {
      voteEvents.emit('EDeleteMember', this.props.member.id);
    }
  }

  editMember = () => {
    voteEvents.emit('EEditMember', this.props.member.id);
  }

  render() {
    
    return (
      <tr key={this.props.member.id}>
        <td>{this.props.member.name}</td>
        <td>{this.props.member.phone}</td>
        <td>{this.props.member.email}</td>
        <td>{this.props.member.job}</td>
        <td><input type="button" value="Edit" className='Read' disabled = {(this.props.mode===8)?true:false} onClick={this.editMember}/></td>
        <td><input type="button" value="Delete" className='Read' disabled = {(this.props.mode===8)?true:false} onClick={this.deleteMember}/></td>
      </tr>
    );

  }

}

export default Member;
