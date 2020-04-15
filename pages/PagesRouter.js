import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Page_Main from './Page_Main';
import Page_Topics from './Page_Topics';
import Page_Topic from './Page_Topic';
import Page_Speakers from './Page_Speakers';
import Page_Speaker from './Page_Speaker';
import Page_Members from './Page_Members';
import Page_Member from './Page_Member';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route path="/" exact component={Page_Main} />
        <Route path="/topics" component={Page_Topics} />
        
      </div>
    );
    
  }

}
    
export default PagesRouter;
    