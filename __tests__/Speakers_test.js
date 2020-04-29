import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import Speaker from '../components/Speaker'
import Speakers from '../components/Speakers'

Enzyme.configure({ adapter: new Adapter() });

const component = shallow(<Speakers />);
const speakers = [{id:460,name:"Inokentii Zhivago",phone:"+375442569847",position:"Business analyst",topic:"Business analysis in software development"},{id:1348,name:"Veronika Dokuro",phone:"+375332548965",position:"Q&A Engineer",topic:"Software testing"}];
describe('<Speakers /> component', () => {
    it('should render', () => {
        component.setState({ dataReady: true, speakers: speakers});
        speakers.map( speaker =>
            shallow(<Speaker key={speaker.id} 
                speaker={speaker}/>)
          );
        const tree = toJson(component);
        expect(tree).toMatchSnapshot();

        component.find('.Add').simulate("click");
    });
});