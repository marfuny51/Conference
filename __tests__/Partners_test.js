import React from 'react';
import Partners from '../components/Partners';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from '../redux/reducers.js';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

let store=createStore(combinedReducer, applyMiddleware(thunk));

test('работа Partners', () => {

    let partners={"partners":[{"id": 1, "name": "MediaCorporation","country": "Germany"},{"id": 2,"name": "Sistem knowledges","country": "USA"}, {"id": 3,"name": "ELAM System", "country": "Belarus"}]};
    // создаём тестовую версию компонента
    const component = renderer.create(
        <Provider store={store}>
                  <Partners />
          </Provider>
    );
  
    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
  
    wrapper.find('[htmlFor="checkbox"]').simulate('change', {
        target: { info: {partners:[{id: 3,name: "ELAM System", country: "Belarus"},{id: 1, name: "MediaCorporation",country: "Germany"}, {id: 2,name: "Sistem knowledges",country: "USA"}]} },
      });

    let componentTreeSort=component.toJSON();
    expect(componentTreeSort).toMatchSnapshot();
    
    wrapper.find('[htmlFor="checkbox"]').simulate('change', {
        target: { info: {partners:[{id: 1, name: "MediaCorporation",country: "Germany"},{id: 2,name: "Sistem knowledges",country: "USA"}, {id: 3,name: "ELAM System", country: "Belarus"}]} },
      });

    // получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    /*
    // можно эмулировать события, передавая в качестве объекта события то что нам нужно:
    wrapper.find('select').simulate('change', {
      target: { value: "hello" },
    });
    */
  
  });

  const mapStateToProps = function (state) {
    return {
      info: state.info,
    };
  };
  