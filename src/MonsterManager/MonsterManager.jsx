import React, { Component } from 'react'

import { MonsterElement } from '../Models/MonsterElement'

import { MonsterDisplay } from '../MonsterDisplay/MonsterDisplay'
import { SearchResult } from '../SearchResult/SearchResult'

import './MonsterManager.css'

class MonsterManager extends Component {
	constructor(props) {
		super(props)
		this.state = {
			monsterElement: MonsterElement.Light,
			monsterName: '',
			monsterStars: 3,
			monsters: [],
			searchQuery: ''
		}
		this.monsterData = []
	}

	componentDidMount() {
		window.document.title = 'Monster Manager | Summ Go'

		this.loadMonsters()

		if (!window.localStorage) {
			return
		}
		const monstersString = window.localStorage.getItem('summ-go.monsters')
		if (!monstersString || monstersString === '') {
			return
		}
		try {
			const monsters = JSON.parse(monstersString)
			this.setState({ monsters })
		}
		catch(err) {
			console.warn('Failed to load monsters from local storage', err)
		}
	}

	render() {
		const { searchQuery } = this.state
		const lowerSearchQuery = searchQuery.toLowerCase()

		return (
			<article className="monster-manager">
				<h2>Monster Manager</h2>
				<button className="store-to-local"
					onClick={this.storeMonstersToLocal}>Store in Local Storage</button>
				<button className="clear-monsters"
					onClick={this.clearMonsters}>Clear Current Monsters</button>
				<section>
					<label htmlFor="mon-name">Name</label>
					<input
						id="mon-name"
						name="mon-name"
						type="text"
						onChange={this.onMonsterNameChange}
						value={this.state.monsterName} />
					{this.monsterData.length > 0 && searchQuery !== '' && <div className="search-results">
						<ul>
							{this.monsterData
								.filter(mon => mon.name.toLowerCase().indexOf(lowerSearchQuery) > -1
									|| mon.awakenedName.toLowerCase().indexOf(lowerSearchQuery) > -1)
								.map(mon =>
									<li key={mon.awakenedName}>
										<SearchResult mon={mon} onClick={this.addLoadedMonster} />
									</li>
								)
							}
						</ul>
					</div>}
				</section>
				<section className="monster-storage">
					{this.state.monsters.length === 0 && <p>No monsters</p>}
					{this.state.monsters.length > 0 &&
					<ul>
						{this.state.monsters.map(monster => <MonsterDisplay key={monster.name} monster={monster} />)}
					</ul>}
				</section>
			</article>
		)
	}

	addLoadedMonster = mon => {
		const updatedMonsters = [...this.state.monsters].concat(mon)

		this.setState({
			monsterElement: MonsterElement.Light,
			monsterName: '',
			monsterStars: 3,
			monsters: updatedMonsters,
			searchQuery: ''
		})
	}

	clearMonsters = () => this.setState({ monsters: [] })

	loadMonsters = async () => {
		const response = await window.fetch('./monsterData.json')
		const monsters = await response.json()
		this.monsterData = monsters
	}

	onMonsterNameChange = ({ target: { value } }) => this.setState({ monsterName: value, searchQuery: value })

	storeMonstersToLocal = () => {
		if (!window.localStorage) {
			return
		}
		window.localStorage.setItem('summ-go.monsters', JSON.stringify(this.state.monsters))
		alert('Saved')
	}
}

export { MonsterManager }
