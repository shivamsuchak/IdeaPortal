import ThemesByDateChart from '../components/ThemesByDateChart'
import { shallow } from 'enzyme'
import React from 'react'

describe('ThemesByDateChart', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ThemesByDateChart />)
	})
})
