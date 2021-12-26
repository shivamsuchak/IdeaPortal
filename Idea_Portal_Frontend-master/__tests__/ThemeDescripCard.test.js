import ThemeDescripCard from '../components/ThemeDescripCard'
import { shallow } from 'enzyme'
import React from 'react'
import BoxComponent from '../components/BoxComponent'
describe('ThemeDescripCard', () => {
	let wrapper

	it('renders without crashing', () => {
		wrapper = shallow(<ThemeDescripCard client='hello' />)
	})
})
