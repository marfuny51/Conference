import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from '../components/events';
import Topic from '../components/Topic';
import renderer from 'react-test-renderer';

test('работа MobileCompany', () => {

    let topic={id:3, title:'How to be happy?', mainWords: 'Happiness', author: 'Ivan Ivanov', info:'Do not worry, be happy'};
    // создаём тестовую версию компонента
    const component = renderer.create(
      <Topic 
      topic={topic}
    />
    );
  
    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    // найдём в вёрстке компонента кнопку фильтрации 'Blocked'
    const buttonRead = component.root.findByProps(  {value:'Read more...'}); 
    // и "нажмём" на неё
    buttonRead.props.onClick();
  
    // получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    // найдём в вёрстке компонента кнопку фильтрации 'Blocked'
    const buttonHide = component.root.findByProps(  {value:'Hide'}); 
    // и "нажмём" на неё
    buttonHide.props.onClick();
  
    // получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
  
    // найдём в вёрстке компонента кнопку 'Edit'
    const buttonEdit = component.root.findByProps( {value:'Edit'}); 
    // и "нажмём" на неё
    buttonEdit.props.onClick();
    window.confirm = () => {true};
 
    // получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
  
    // найдём в вёрстке компонента кнопку 'Delete'
    const buttonDelete = component.root.findByProps( {value:'Delete'}); 
    // и "нажмём" на неё
    buttonDelete.props.onClick();
  
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
  