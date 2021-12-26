import UploadedIdea from '../components/UploadedIdea'
import { shallow } from 'enzyme'
import React from 'react'

describe('UploadedIdea', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<UploadedIdea />)
	})
})
