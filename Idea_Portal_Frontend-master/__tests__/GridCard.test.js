import GridCard from '../components/GridCard'
import { shallow } from 'enzyme'
import React from 'react'

describe('GridCard', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<GridCard />)
	})
})
