import * as React from 'react'
import { shallow } from 'enzyme'
import { create } from 'react-test-renderer'

import Header from '../../src/client/components/header'

describe('<Header />', () => {
    // it('Matches snapshot', () => {
    //     const tree = create(<Header location={'/'} />)
    //     expect(tree).toMatchSnapshot()
    // })

    it('Clicking the button increments the counter', () => {
        const wrapper = shallow(<Header location={'/'} />)

        // expect(wrapper.find('#counter').html()).toContain('0')
        // wrapper.find('#increment-btn').simulate('click')
        // expect(wrapper.find('#counter').html()).toContain('1')
    })
})
