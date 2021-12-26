import CreateThemeForm from '../components/CreateThemeFrom'
import { shallow } from 'enzyme'
import React from 'react'

describe('CreateThemeForm', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<CreateThemeForm />)
	})
})
