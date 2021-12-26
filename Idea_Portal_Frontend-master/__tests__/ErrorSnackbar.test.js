import ErrorSnackbar from '../components/ErrorSnackbar'
import { shallow } from 'enzyme'
import React from 'react'

describe('ErrorSnackbar', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ErrorSnackbar />)
	})
})
