import UpdateProCompo from '../components/UpdateProCompo'
import { shallow } from 'enzyme'
import React from 'react'

describe('UpdateProCompo', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<UpdateProCompo />)
	})
})
