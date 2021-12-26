import CreateIdeaForm from '../components/CreateIdeaFrom'
import { shallow } from 'enzyme'
import React from 'react'

describe('CreateIdeaForm', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<CreateIdeaForm />)
	})
})
