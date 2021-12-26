import NewTableForIdeas from '../components/NewTableForIdeas'
import { shallow } from 'enzyme'
import React from 'react'

describe('NewTableForIdeas', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<NewTableForIdeas />)
	})
})
