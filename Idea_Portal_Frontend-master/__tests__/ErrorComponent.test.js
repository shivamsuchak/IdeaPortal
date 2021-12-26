import ErrorComponent from '../components/ErrorComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('ErrorComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ErrorComponent />)
	})
})
