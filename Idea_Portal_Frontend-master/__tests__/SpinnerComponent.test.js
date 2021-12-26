import SpinnerComponent from '../components/SpinnerComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('SpinnerComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<SpinnerComponent />)
	})
})
