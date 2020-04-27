import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Page_Main from './Page_Main';
import Page_Topics from './Page_Topics';
import Page_Speakers from './Page_Speakers';
import Page_Members from './Page_Members';
import Page_Partners from './Page_Partners';
import Page_Partner from './Page_Partner';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route path="/" exact component={Page_Main} />
        <Route path="/topics" component={Page_Topics} />
        <Route path="/speakers" component={Page_Speakers} />
        <Route path="/members" component={Page_Members} />
        <Route path="/partners" component={Page_Partners} />
        <Route path="/partners/:clid" component={Page_Partner} />
      </div>
    );
    
  }

}
    
export default PagesRouter;
    