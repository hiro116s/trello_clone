import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import BoardCreate from './BoardCreate';

test('renders BoardCreate', () => {
    const onBoardAdded = sinon.spy();
    const wrapper = mount(<BoardCreate
        currentCounter={0}
        onBoardAdded={onBoardAdded}
    />);
    expect(wrapper.find('div').text()).toEqual("Create board");
    wrapper.find('div').simulate('click');
    wrapper.find('input').at(0).simulate('change', { target: { name: 'board_name', value: 'board1'}});
    wrapper.find('input').at(1).simulate('submit');
    expect(wrapper.contains('form')).toBe(false);
    expect(onBoardAdded).toHaveProperty('callCount', 1);
});
