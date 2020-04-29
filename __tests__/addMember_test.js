"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import {events} from '../components/events';
import AddMember from '../components/addMember';
let member = {id:7265,name:"Anna Beresovnik",phone:"+375294587965",email:"berezovnik@gmail.com",job:"Student"};

test('работа addMember', () => {
    const component = renderer.create(
        <AddMember member={member}/>
      );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const inst = component.getInstance();
  inst.newDescription='aaa';
  inst.newName='a';
 
  const buttonAdd = component.root.find((el) =>
  el.type == 'input' && el.props.value == 'Save');
  buttonAdd.props.onClick();

  const buttonCancel = component.root.find((el) =>
  el.type == 'input' && el.props.value == 'Cancel');
  buttonCancel.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  buttonAdd.props.onClick();
  buttonCancel.props.onClick();
 

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();


})