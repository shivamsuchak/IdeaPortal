import SuccessSnackbar from '../components/SuccessSnackbar'
import { shallow } from 'enzyme'
import React from 'react'

describe('SuccessSnackbar', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<SuccessSnackbar />)
	})
})
