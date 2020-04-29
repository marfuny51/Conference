import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import Member from '../components/Member'
import Members from '../components/Members'

Enzyme.configure({ adapter: new Adapter() });

const component = shallow(<Members />);
const members = [{id:4449,name:"Aleksandr Pugach",phone:"+375297598465",email:"sasha@gmail.com",job:"QA engineer"},{id:6522,name:"Ekaterina Ivanova",phone:"+375442569874",email:"katya@bk.ru",job:"HR specialist"}];
describe('<Members /> component', () => {
    it('should render', () => {
        component.setState({ dataReady: true, members: members});
        members.map( member =>
            shallow(<Member key={member.id} 
                member={member}/>)
          );
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();

        component.find('.Add').simulate("click");
    });

    
});

