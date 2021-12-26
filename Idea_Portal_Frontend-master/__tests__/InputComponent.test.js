import InputComponent from '../components/InputComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('InputComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<InputComponent />)
	})
})
