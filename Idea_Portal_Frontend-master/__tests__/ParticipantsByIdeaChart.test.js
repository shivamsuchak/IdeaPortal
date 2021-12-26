import ParticipantsByIdeaChart from '../components/ParticipantsByIdeaChart'
import { shallow } from 'enzyme'
import React from 'react'

describe('ParticipantsByIdeaChart', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ParticipantsByIdeaChart />)
	})
})
