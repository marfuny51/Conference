import React from 'react';
import Member from '../components/Member';
import renderer from 'react-test-renderer';

test('работа Member', () => {

    let member={id:7265,name:"Anna Beresovnik",phone:"+375294587965",email:"berezovnik@gmail.com",job:"Student"};
    // создаём тестовую версию компонента
    const component = renderer.create(
      <Member 
      member={member}
    />
    );
  
    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    let componentTree=component.toJSON();
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
    
    buttonEdit.props.onClick(); 
    
    // получаем уже изменённый снэпшот
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
    
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
  