import UserInfo from '../components/UserInfo'
import { shallow } from 'enzyme'
import React from 'react'

describe('UserInfo', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<UserInfo />)
	})
})
