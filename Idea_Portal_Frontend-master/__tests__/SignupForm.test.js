import SignupForm from '../components/SignupForm'
import { shallow } from 'enzyme'
import React from 'react'

describe('SignupForm', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<SignupForm />)
	})
})
