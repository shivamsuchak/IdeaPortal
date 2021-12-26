import ButtonComponent from '../components/ButtonComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('ButtonComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ButtonComponent />)
	})
})
