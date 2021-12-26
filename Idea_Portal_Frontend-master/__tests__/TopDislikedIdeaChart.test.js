import TopDislikedIdeaChart from '../components/TopDislikedIdeaChart'
import { shallow } from 'enzyme'
import React from 'react'

describe('TopDislikedIdeaChart', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<TopDislikedIdeaChart />)
	})
})
