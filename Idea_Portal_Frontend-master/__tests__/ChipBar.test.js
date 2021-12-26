import ChipBar from '../components/ChipBar'
import { shallow } from 'enzyme'
import React from 'react'

describe('ChipBar', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ChipBar />)
	})
})
