import React from 'react'

import { shallow } from 'enzyme'

import { MonsterManager } from './MonsterManager'

describe('Monster Manager componenet', () => {
	let fixture

	it('renders properly without props', () => {
		fixture = shallow(<MonsterManager />)
		expect(fixture).toMatchSnapshot()
	})

	it('renders monster addition form properly', () => {
		fixture = shallow(<MonsterManager />)
		const monsterForm = fixture.find('form')

		expect(monsterForm.exists()).toBeTruthy()

		// NOTE: verify name input
		const nameInput = monsterForm.find('input#mon-name')
		expect(nameInput.exists()).toBeTruthy()
		const nameProps = nameInput.props()

		expect(nameProps.id).toEqual('mon-name')
		expect(nameProps.name).toEqual('mon-name')
		expect(nameProps.type).toEqual('text')
		expect(nameProps.value).toEqual('')
		expect(nameProps.onChange).toBeDefined()

		// NOTE: verify submit input
		const submitInput = monsterForm.find('input[type="submit"]')
		expect(submitInput.exists()).toBeTruthy()
		const submitProps = submitInput.props()

		expect(submitProps.value).toEqual('Add Monster')
	})
})
