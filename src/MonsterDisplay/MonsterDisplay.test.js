import React from 'react'

import { mount, shallow } from 'enzyme'

import { MonsterDisplay } from './MonsterDisplay'
import { Monster } from '../Models/Monster';
import { MonsterElement } from '../Models/MonsterElement';

describe('Monster Display component', () => {
	let fixture
	const targetMonster = new Monster('mon 1', MonsterElement.Dark, 4)
	
	beforeEach(() => {
		fixture = shallow(<MonsterDisplay monster={targetMonster} />)
	})

	it('renders monster details', () => {
		expect(fixture).toMatchSnapshot()

		expect(fixture.find('h3').text()).toBe('mon 1')
		expect(fixture.find('.monster-element').text()).toBe('dark')
		expect(fixture.find('.monster-stars').text()).toBe('4')
	})
})
