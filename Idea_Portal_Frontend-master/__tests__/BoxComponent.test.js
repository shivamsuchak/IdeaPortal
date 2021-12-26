import BoxComponent from '../components/BoxComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('BoxComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<BoxComponent />)
	})
})
