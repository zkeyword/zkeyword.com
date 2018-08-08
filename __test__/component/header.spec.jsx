import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../src/client/components/header'

describe('<Header />', () => {

    it('Clicking the button increments the counter', () => {
        const wrapper = shallow(<Header location={'/'} />)

        expect(wrapper.find('#counter').html()).toContain('0')
        wrapper.find('#increment-btn').simulate('click')
        expect(wrapper.find('#counter').html()).toContain('1')
    })
})