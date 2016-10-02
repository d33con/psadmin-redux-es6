import expect from 'expect'; //assertion library
import {mount, shallow} from 'enzyme';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm'; // component under TestUtils

function setup(saving) {
  let props = {
    course: {}, saving: saving, errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props}/>);
}


describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    // reference to wrapper
    const wrapper = setup(false);
    // assertions to test
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labelled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labelled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
