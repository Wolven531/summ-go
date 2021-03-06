import React from 'react'

import { jest } from 'jest'
import { mount, shallow } from 'enzyme'
import { afterEach, beforeEach, describe, expect, it } from 'mocha'

import { Monster } from '../Models/Monster'

import { MonsterDisplay } from '../MonsterDisplay/MonsterDisplay'
import { MonsterManager } from './MonsterManager'
import { MonsterElement } from '../Models/MonsterElement'

describe('Monster Manager component', () => {
	let fixture
	let mockAlert
	let originalAlert
	
	beforeEach(() => {
		fixture = shallow(<MonsterManager />)
		
		mockAlert = jest.fn()

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
		const monsterStorage = fixture.find('.monster-storage')

		expect(monsterStorage.exists()).toBeTruthy()
		expect(monsterStorage.text()).toBe('No monsters')

		// NOTE: verify name input
		const nameInput = fixture.find('input#mon-name')
		expect(nameInput.exists()).toBeTruthy()
		const nameProps = nameInput.props()

		expect(nameProps.id).toEqual('mon-name')
		expect(nameProps.name).toEqual('mon-name')
		expect(nameProps.type).toEqual('text')
		expect(nameProps.value).toEqual('')
		expect(nameProps.onChange).toBeDefined()
	})

	it('renders clear current monsters button', () => {
		const clearButton = fixture.find('button.clear-monsters')

		expect(clearButton.exists()).toBeTruthy()
		expect(clearButton.text()).toBe('Clear Current Monsters')
		expect(clearButton.props().onClick).toBeDefined()
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
		window.alert = originalAlert
	})
})

describe('loading monster data using fetch when mounted', () => {
	const loadedMonsters = [
		new Monster('Boomerang Warrior', 'Marina', MonsterElement.Dark, 4, ''),
		new Monster('Boomerang Warrior', 'Bailey', MonsterElement.Light, 3, 'someImgData'),
		new Monster('Boomerang Warrior', 'mon 3', MonsterElement.Wind, 5, '')
	]

	let fixture
	let mockFetch
	let mockResponse
	let originalFetch

	beforeEach(() => {
		// eslint-disable-next-line no-unused-vars
		mockFetch = jest.fn(url => Promise.resolve(mockResponse))
		mockResponse = { json: jest.fn(() => loadedMonsters) }

		originalFetch = window.fetch
		window.fetch = mockFetch

		fixture = mount(<MonsterManager />)
	})

	it('should fetch and store monster data', () => {
		expect(mockFetch).toHaveBeenLastCalledWith('./monsterData.json')
		expect(mockResponse.json).toHaveBeenCalledTimes(1)
		expect(fixture.instance().monsterData).toEqual(loadedMonsters)
	})

	describe('typing in wrong case search query', () => {
		beforeEach(() => {
			fixture.find('input#mon-name').simulate('change', { target: { value: 'bAiLeY' } })
		})

		it('should show search results box', () => {
			fixture.update()
			expect(fixture.find('.search-results').exists()).toBe(true)
			// TODO: update this with SearchResult component
			// expect(fixture.find('li.search-result').text()).toBe('Bailey (Light Boomerang Warrior)')
			// const imgProps = fixture.find('li.search-result img').props()
			// expect(imgProps.src).toBe('data:image/png;base64,someImgData')
			// expect(imgProps.alt).toBe('Awakened portrait for Bailey')
		})
	})

	describe('typing in search query', () => {
		beforeEach(() => {
			fixture.find('input#mon-name').simulate('change', { target: { value: 'Bailey' } })
		})

		it('should show search results box', () => {
			fixture.update()
			expect(fixture.find('.search-results').exists()).toBe(true)
			// TODO: update this with SearchResult component
			// expect(fixture.find('li.search-result').text()).toBe('Bailey (Light Boomerang Warrior)')
		})

		describe('clicking on search result', () => {
			beforeEach(() => {
				fixture.find('.search-result').simulate('click', { target: { } })
			})
	
			it('should add monster to current monsters and clear search box', () => {
				fixture.update()
				expect(fixture.find('input#mon-name').props().value).toBe('')
				expect(fixture.find('.monster-storage').find(MonsterDisplay).length).toBe(1)
			})
		})
	})
	
	afterEach(() => {
		window.fetch = originalFetch
	})
})

describe('when localStorage has a bad value', () => {
	// eslint-disable-next-line no-unused-vars
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
		new Monster('mon 1', 'awakened 1', MonsterElement.Dark, 1, ''),
		new Monster('mon 2', 'awakened 2', MonsterElement.Light, 3, ''),
		new Monster('mon 3', 'awakened 3', MonsterElement.Wind, 5, '')
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
