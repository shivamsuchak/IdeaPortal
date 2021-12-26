import IdeasByThemeChart from '../components/IdeasByThemeChart'
import { shallow } from 'enzyme'
import React from 'react'

describe('IdeasByThemeChart', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<IdeasByThemeChart />)
	})
})
