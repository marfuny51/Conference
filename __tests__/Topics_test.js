import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import Topic from '../components/Topic'
import Topics from '../components/Topics'

Enzyme.configure({ adapter: new Adapter() });

const component = shallow(<Topics />);
const topics = [{id:3, title:'How to be happy?', mainWords: 'Happiness', author: 'Ivan Ivanov', info:'Do not worry, be happy'}, {id:4, title:'How to be a programmer?', mainWords: 'IT-industry', author: 'Pavel Pashkin', info:'Anyone can become a programmer'}]
describe('<Topics /> component', () => {
    it('should render', () => {
        component.setState({ dataReady: true, topics: topics});
        topics.map( topic =>
            shallow(<Topic key={topic.id} 
            topic={topic}/>)
          );
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();

        component.find('.Add').simulate("click");

    });
});