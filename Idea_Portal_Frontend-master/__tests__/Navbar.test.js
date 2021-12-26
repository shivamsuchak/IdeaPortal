import Navbar from '../components/Navbar'
import { shallow } from 'enzyme'
import React from 'react'

describe('Navbar', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<Navbar />)
	})
})
