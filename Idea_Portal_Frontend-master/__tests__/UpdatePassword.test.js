import UpdatePassword from '../components/UpdatePassword'
import { shallow } from 'enzyme'
import React from 'react'

describe('UpdatePassword', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<UpdatePassword />)
	})
})
