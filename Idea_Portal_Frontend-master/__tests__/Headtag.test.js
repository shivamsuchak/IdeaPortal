import Headtag from '../components/Headtag'
import { shallow } from 'enzyme'
import React from 'react'

describe('Headtag', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<Headtag />)
	})
})
