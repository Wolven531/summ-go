import React from 'react'

import { shallow } from 'enzyme'

import { MonsterManager } from './MonsterManager'

describe('Monster Manager componenet', () => {
	let fixture

	it('renders properly without props', () => {
		fixture = shallow(<MonsterManager />)
		expect(fixture).toMatchSnapshot()
	})
})
