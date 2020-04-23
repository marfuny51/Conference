import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';

class PagesLinks extends React.Component {
          
  render() {

    return (
      <div className='Links'>
        <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Conference</NavLink>
        <NavLink to="/topics" className="PageLink" activeClassName="ActivePageLink">Topics</NavLink>
        <NavLink to="/speakers" className="PageLink" activeClassName="ActivePageLink">Speakers</NavLink>
        <NavLink to="/members" className="PageLink" activeClassName="ActivePageLink">Members</NavLink>
      </div>
    );
    
  }

}
    
export default PagesLinks;
    