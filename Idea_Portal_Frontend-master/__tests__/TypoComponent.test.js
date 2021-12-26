import TypoComponent from '../components/TypoComponent'
import { shallow } from 'enzyme'
import React from 'react'

describe('TypoComponent', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<TypoComponent />)
	})
})
