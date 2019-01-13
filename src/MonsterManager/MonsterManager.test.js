import React from 'react'

import { mount, shallow } from 'enzyme'

import { Monster } from '../Models/Monster'

import { MonsterDisplay } from '../MonsterDisplay/MonsterDisplay'
import { MonsterManager } from './MonsterManager'

describe('Monster Manager component', () => {
	let fixture
	let mockAlert
	let mockPreventDefault
	let originalAlert
	
	beforeEach(() => {
		fixture = shallow(<MonsterManager />)
		
		mockAlert = jest.fn()
		mockPreventDefault = jest.fn()

		originalAlert = window.alert
		window.alert = mockAlert

		localStorage.clear()
	})

	it('renders without props', () => {
		expect(fixture).toMatchSnapshot()
	})

	it('loads from localStorage', () => {
		expect(localStorage.getItem).toHaveBeenLastCalledWith('summ-go.monsters')
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

		// NOTE: verify star inputs
		const starInputs = monsterForm.find('input[name="monster-stars"]')
		expect(starInputs).toHaveLength(5)

		let inputCounter = 1
		for (const starInput of starInputs) {
			const starInputProps = starInputs.at(inputCounter - 1).props()

			expect(starInputProps.id).toEqual(`monster-star-${inputCounter}`)
			expect(starInputProps.name).toEqual('monster-stars')
			expect(starInputProps.type).toEqual('radio')
			expect(starInputProps.value).toEqual(inputCounter)
			expect(starInputProps.onChange).toBeDefined()
			inputCounter++
		}

		// NOTE: verify submit input
		const submitInput = monsterForm.find('input[type="submit"]')
		expect(submitInput.exists()).toBeTruthy()
		const submitProps = submitInput.props()

		expect(submitProps.value).toEqual('Add Monster')
	})

	it('renders clear current monsters button', () => {
		const clearButton = fixture.find('button.clear-monsters')

		expect(clearButton.exists()).toBeTruthy()
		expect(clearButton.text()).toBe('Clear Current Monsters')
		expect(clearButton.props().onClick).toBeDefined()
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
			expect(fixture.find('.monster-storage .monster-display')).toHaveLength(0)
		})
	})

	describe('filling in monster name and stars and clicking add', () => {
		beforeEach(() => {
			// NOTE: use mount due to heavy DOM interaction
			fixture = mount(<MonsterManager />)
			fixture.find('input#mon-name').simulate('change', { target: { value: 'mon1' } })
			fixture.find('input#monster-star-5').simulate('change', { target: { } })
			fixture.find('input[type="submit"]').simulate('submit', { preventDefault: mockPreventDefault })
		})

		it('clears name input and adds monster to monster storage', () => {
			fixture.update()
			expect(mockPreventDefault).toHaveBeenCalledTimes(1)
			expect(fixture.find('input#mon-name').props().value).toBe('')
			expect(fixture.find('.monster-storage .monster-display')).toHaveLength(1)
		})

		describe('clicking clear monsters button', () => {
			beforeEach(() => {
				fixture.find('.clear-monsters').simulate('click', {})
			})

			it('should clear the monsters list', () => {
				expect(fixture.find('.monster-storage .monster-display')).toHaveLength(0)
				expect(fixture.find('.monster-storage p').text()).toBe('No monsters')
			})
		})

		afterEach(() => {
			fixture.unmount()
		})
	})

	afterEach(() => {
		window.alert = originalAlert
	})
})

describe('when localStorage has a bad value', () => {
	let fixture
	let mockConsole
	let originalConsole

	beforeEach(() => {
		originalConsole = window.console
		mockConsole = {
			log: jest.fn(),
			warn: jest.fn()
		}
		window.console = mockConsole
		localStorage.setItem('summ-go.monsters', 'asdf')
		fixture = shallow(<MonsterManager />)
	})

	it('handles errors loading from localStorage properly', () => {
		expect(mockConsole.warn).toHaveBeenLastCalledWith('Failed to load monsters from local storage')
	})

	afterEach(() => {
		window.console = originalConsole
	})
})

describe('when localStorage has valid monsters', () => {
	let fixture
	let loadedMonsters = [
		new Monster('mon 1', 1),
		new Monster('mon 2', 3),
		new Monster('mon 3', 5)
	]

	beforeEach(() => {
		localStorage.setItem('summ-go.monsters', JSON.stringify(loadedMonsters))
		fixture = shallow(<MonsterManager />)
	})

	it('handles errors loading from localStorage properly', () => {
		expect(fixture.find('.monster-storage').find(MonsterDisplay)).toHaveLength(loadedMonsters.length)
		// for (let i = 0; i < loadedMonsters.length; i++) {
		// 	const mon = loadedMonsters[i]
		// 	expect(fixture.find('.monster-storage li').at(i).text()).toBe(mon.name)
		// }
	})

	describe('clicking store to local button', () => {
		let originalAlert
		let mockAlert

		beforeEach(() => {
			originalAlert = window.alert
			mockAlert = jest.fn()
			window.alert = mockAlert
			fixture.find('button.store-to-local').simulate('click', {})
		})

		it('replaces the monsters in localStorage', () => {
			expect(localStorage.setItem).toHaveBeenLastCalledWith('summ-go.monsters', JSON.stringify(loadedMonsters))
			expect(mockAlert).toHaveBeenLastCalledWith('Saved')
		})

		afterEach(() => {
			window.alert = originalAlert
		})
	})
})

describe('when localStorage does not exist', () => {
	let fixture
	let originalStorage

	beforeEach(() => {
		originalStorage = localStorage
		delete window.localStorage
		fixture = shallow(<MonsterManager />)
	})

	it('renders without exception', () => {
		expect(fixture).toMatchSnapshot()
	})

	describe('clicking store to local button', () => {
		beforeEach(() => {
			fixture.find('button.store-to-local').simulate('click', {})
		})

		it('handles lack of localStorage gracefully', () => {
			expect(fixture).toMatchSnapshot()
		})
	})

	afterEach(() => {
		window.localStorage = originalStorage
	})
})
