import ResetPassword from '../components/ResetPassword'
import { shallow } from 'enzyme'
import React from 'react'

describe('ResetPassword', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ResetPassword />)
	})
})
