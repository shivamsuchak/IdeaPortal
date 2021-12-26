import LikeComment from '../components/LikeComment'
import { shallow } from 'enzyme'
import React from 'react'

describe('LikeComment', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<LikeComment />)
	})
})
