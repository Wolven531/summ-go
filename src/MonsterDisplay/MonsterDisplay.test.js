import React from 'react'

import { mount, shallow } from 'enzyme'

import { MonsterDisplay } from './MonsterDisplay'
import { Monster } from '../Models/Monster';
import { MonsterElement } from '../Models/MonsterElement';

describe('Monster Display component', () => {
	let fixture
	const targetMonster = new Monster('Boomerang Warrior', 'Marina', MonsterElement.Dark, 4)
	
	beforeEach(() => {
		fixture = shallow(<MonsterDisplay monster={targetMonster} />)
	})

	it('renders monster details', () => {
		expect(fixture).toMatchSnapshot()

		expect(fixture.find('h3').text()).toBe('Marina (Dark Boomerang Warrior)')
		expect(fixture.find('.element').text()).toBe('Dark')
		expect(fixture.find('.monster-stars').text()).toBe('4')
	})
})
