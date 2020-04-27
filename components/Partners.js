import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

import { infoThunkAC, infoThunkAC2 } from "../redux/fetchThunk";

import './Partners.css';

class Partners extends React.PureComponent {

  static propTypes = {
    info: PropTypes.object.isRequired,
  };

  state = {
    sort: false,
    line:'',
  }
            
  componentDidMount() {
    this.props.dispatch( infoThunkAC(this.props.dispatch) );
  }

  sort = () => {
    if (this.state.sort === false) {
      this.setState({sort: true});
      this.props.dispatch( infoThunkAC2(this.props.dispatch) );
    }
    else {
      this.setState({sort: false});
      this.props.dispatch( infoThunkAC(this.props.dispatch) );
    }
  }

  lineSearch = (EO) => {
    this.setState({line: EO.target.value.toString()}, this.search);
    //this.props.dispatch( infoThunkAC3(this.props.dispatch, this.state.line) );
  }

  search = () => {
    this.props.info.data = this.props.info.data.filter(partner => partner.name.indexOf(this.state.line)!=-1)
  }

  reset = () => {
    this.setState({sort: false, line: ''});
    this.props.dispatch( infoThunkAC(this.props.dispatch) );
  }

  render() {

    if ( this.props.info.status<=1 )
      return "загрузка...";

    if ( this.props.info.status===2 )
      return "ошибка загрузки данных";
    
    return (
      <div className='Partner'>
        <span className='Sort'>Sort information </span><input type='checkbox' className='Checkbox' checked= {this.state.sort} onChange={this.sort} /><br/>
        <input type='button' className='Reset' value='Reset' onClick={this.reset}/>
        <div> 
          {this.props.info.data.map(a=> 
          <p key={a.id}><NavLink to={"/partner/"+a.name} className="NavLink">{a.name}</NavLink></p>)
          }
        </div>
      </div>
    );

  }

}

const mapStateToProps = function (state) {
  return {
    info: state.info,
  };
};

export default connect(mapStateToProps)(Partners);
