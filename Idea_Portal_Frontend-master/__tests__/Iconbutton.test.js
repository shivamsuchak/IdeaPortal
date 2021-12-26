import Iconbutton from '../components/Iconbutton'
import { shallow } from 'enzyme'
import React from 'react'

describe('Iconbutton', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<Iconbutton />)
	})
})
