import Chip from '../components/Chip'
import { shallow } from 'enzyme'
import React from 'react'

describe('Chip', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<Chip />)
	})
})
