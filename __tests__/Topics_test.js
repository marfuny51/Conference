"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from '../components/events';
import isoFetch from 'isomorphic-fetch';
import Topic from '../components/Topic';
import AddTopic from '../components/addTopic';
import EditTopic from '../components/editTopic';
import Topics from '../components/Topics';
import renderer from 'react-test-renderer';

test('работа Topics', () => {

  // создаём тестовую версию компонента
  const component = renderer.create(
    <Topics />
  );

  // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

 // найдём в вёрстке компонента кнопку фильтрации 'Add new topic'
  const buttonAdd = component.root.findByProps( {value:'Add a new topic'});
  // и "нажмём" на неё
  buttonAdd.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента кнопку фильтрации 'Add new topic'
  const buttonRead = component.root.findByProps( {value:'Read more...'}); 
  // и "нажмём" на неё
  buttonRead.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента кнопку фильтрации 'Add new topic'
  const buttonHide = component.root.findByProps( {value:'Hide'}); 
  // и "нажмём" на неё
  buttonHide.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonRead.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonHide.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonAdd.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента кнопки 'Edit'
  const buttonEdit = component.root.findAll( el => el.props.value=='Edit'); 
  // и "нажмём" на каждую кнопку
  buttonEdit.forEach(button => {
    button.props.onClick();
    // и получим уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  // найдём в вёрстке компонента кнопки 'Delete'
  const buttonDelete = component.root.findAll( el => el.props.value=='Delete'); 
  // и "нажмём" на каждую кнопку
  buttonDelete.forEach(button => {
    button.props.onClick();
    //и получим уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
  });

  /*buttonAdd.props.onClick();*/

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

