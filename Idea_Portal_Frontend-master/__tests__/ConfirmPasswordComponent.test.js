import ConfirmPasswordComponent from '../components/ConfirmPasswordComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('ConfirmPasswordComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ConfirmPasswordComponent />)
	})
})
