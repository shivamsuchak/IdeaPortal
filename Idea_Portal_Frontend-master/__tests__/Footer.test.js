import Footer from '../components/Footer'
import { shallow } from 'enzyme'
import React from 'react'

describe('Footer', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<Footer />)
	})
})
