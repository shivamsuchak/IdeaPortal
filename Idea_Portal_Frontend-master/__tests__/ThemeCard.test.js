import ThemeCard from '../components/ThemeCard'
import { shallow } from 'enzyme'
import React from 'react'

describe('ThemeCard', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ThemeCard client='hello' />)
	})
})
