import UploadedTheme from '../components/UploadedTheme'
import { shallow } from 'enzyme'
import React from 'react'

describe('UploadedTheme', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<UploadedTheme />)
	})
})
