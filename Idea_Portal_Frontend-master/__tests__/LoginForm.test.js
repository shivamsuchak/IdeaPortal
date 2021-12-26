import LoginForm from '../components/LoginForm'
import { shallow } from 'enzyme'
import React from 'react'

describe('LoginForm', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<LoginForm />)
	})
})
