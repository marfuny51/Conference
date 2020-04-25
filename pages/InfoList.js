import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { infoThunkAC } from "../redux/fetchThunk";

class InfoList extends React.PureComponent {

  static propTypes = {
    info: PropTypes.object.isRequired,
  };

  state = {
    list: this.props.info,
    sort: false,
    line:'',
  }
            
  componentDidMount() {
    this.props.dispatch( infoThunkAC(this.props.dispatch) );
  }

  sort = () => {
    if (this.state.sort === false)
        this.setState({sort: true}, this.processList);
    else this.setState({sor: false}, this.processList);
  }

  processList = () => {
    let lines = [];
    for(let i=0; i<this.props.info.data.speakers.lenght; i++) {
        console.log(this.props.info.data.speakers[i].name);
        lines.push(this.props.info.data.speakers[i].name);
        
    }
    for(let i=0; i<this.props.info.data.members.lenght; i++) {
        lines.push(this.props.info.data.members[i].name);
    }
    
    if (this.state.line!='') { 
        lines = lines.filter(line => line.indexOf(this.state.line)!=-1);
    }
    if (this.state.sort == true)  {
        lines.sort(function(a,b) {return (a > b) ? 1 : ((b > a) ? -1 : 0);} ); 
    }
    this.setState({list: lines});
  }

  lineSearch = (EO) => {
    this.setState({line: EO.target.value.toString()}, this.processList);
  }

  reset = () => {
    this.setState({sort: false, line: ''}, this.processList);
  }

  render() {
    
    if ( this.props.info.status<=1 )
      return "загрузка...";

    if ( this.props.info.status===2 )
      return "ошибка загрузки данных";

    let list=[];
    this.props.info.data.speakers.map((speaker)=> {
        list.push([speaker.id, speaker.name]);
    }); 
    this.props.info.data.members.map((member)=> {
        list.push([member.id, member.name]);
    });
    
    return (
      <div>
        <span>Sort information </span><input type='checkbox'  /><br/>
        <span>Search information </span><input type='text' onChange={this.lineSearch} /><br/>
        <input type='button' value='Reset' onClick={this.reset}/> 
        {list.map(a=> 
        <div key={a[0]}>{a[1]}</div>)
        }
      </div>
    );

  }

}

const mapStateToProps = function (state) {
  return {
    info: state.info,
  };
};

export default connect(mapStateToProps)(InfoList);
