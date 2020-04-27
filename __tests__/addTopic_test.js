"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from '../components/events';
import AddTopic from '../components/addTopic';
import renderer from 'react-test-renderer';

test('работа AddTopic', () => {

  let topic= {id:2, title:'Why do I love Web development?', mainWords: 'JavaScript, HTML, CSS', author: 'Ivan Poznan', info:"Front-end development is the creation of the client side of the site. The Front-end developer is responsible for layout of the site template and creating the user interface."};

  // создаём тестовую версию компонента
  const component = renderer.create(
    <AddTopic topic={topic}/>
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

 // найдём в вёрстке компонента кнопку сохранения 'Save'
  const buttonSave = component.root.findByProps( {value:'Save'});
  // и "нажмём" на неё
  buttonSave.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента кнопку кнопку отмены 'Cancel'
  const buttonCancel = component.root.findByProps( {value:'Cancel'}); 
  // и "нажмём" на неё
  buttonCancel.props.onClick();

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
