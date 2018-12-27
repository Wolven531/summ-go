import React from 'react'

import { mount, shallow } from 'enzyme'

import { MonsterManager } from './MonsterManager'

describe('Monster Manager componenet', () => {
	let fixture
	let mockAlert
	let mockPreventDefault
	let originalAlert
	
	beforeEach(() => {
		fixture = shallow(<MonsterManager />)
		
		originalAlert = window.alert
		mockAlert = jest.fn()
		mockPreventDefault = jest.fn()
		window.alert = mockAlert
	})

	it('renders without props', () => {
		expect(fixture).toMatchSnapshot()
	})

	it('renders monster addition form', () => {
		const monsterForm = fixture.find('form')
		const monsterStorage = fixture.find('.monster-storage')

		expect(monsterForm.exists()).toBeTruthy()

		expect(monsterStorage.exists()).toBeTruthy()
		expect(monsterStorage.text()).toBe('No monsters')

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

	describe('clicking add with empty monster name', () => {
		beforeEach(() => {
			fixture = mount(<MonsterManager />)
			fixture.find('input[type="submit"]').simulate('submit', { preventDefault: mockPreventDefault })
		})

		it('should display alert message', () => {
			fixture.update()
			expect(mockPreventDefault).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledWith('Monster name required')
			expect(fixture.find('.monster-storage li')).toHaveLength(0)
		})
	})

	describe('filling in monster name and clicking add', () => {
		beforeEach(() => {
			// NOTE: use mount due to heavy DOM interaction
			fixture = mount(<MonsterManager />)
			fixture.find('input#mon-name').simulate('change', { target: { value: 'mon1' } })
			fixture.find('input[type="submit"]').simulate('submit', { preventDefault: mockPreventDefault })
		})

		it('clears name input and adds monster to monster storage', () => {
			fixture.update()
			expect(mockPreventDefault).toHaveBeenCalledTimes(1)
			expect(fixture.find('input#mon-name').props().value).toBe('')
			expect(fixture.find('.monster-storage li')).toHaveLength(1)
			expect(fixture.find('.monster-storage li').text()).toBe('mon1')
		})

		afterEach(() => {
			fixture.unmount()
		})
	})

	afterEach(() => {
		window.alert = originalAlert
	})
})