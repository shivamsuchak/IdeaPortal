import TopLikedIdeasChart from '../components/TopLikedIdeasChart'
import { shallow } from 'enzyme'
import React from 'react'

describe('TopLikedIdeasChart', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<TopLikedIdeasChart />)
	})
})
