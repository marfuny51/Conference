import React from 'react';
import Speaker from '../components/Speaker';
import renderer from 'react-test-renderer';

test('работа Speaker', () => {

    let speaker={id:460,name:"Inokentii Zhivago",phone:"+375442569847",position:"Business analyst",topic:"Business analysis in software development"};
    // создаём тестовую версию компонента
    const component = renderer.create(
      <Speaker 
      speaker={speaker}
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
  