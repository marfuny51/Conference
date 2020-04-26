import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from '../redux/reducers.js';
import InfoList from '../pages/InfoList';

import './Page_Partners.css';

let store=createStore(combinedReducer, applyMiddleware(thunk));

class Page_Partners extends React.PureComponent {
          
    render() {

        return (
          <Provider store={store}>
              <div  className='Full'>
                  <h1>List of partners</h1>
                  <InfoList />
              </div>
          </Provider>
        );
    
      }

}
    
export default Page_Partners;
    