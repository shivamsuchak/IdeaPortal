import IdeaDescComponent from '../components/IdeaDescComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('IdeaDescComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<IdeaDescComponent />)
	})
})
