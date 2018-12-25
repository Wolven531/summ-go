import React, { Component } from 'react'

import './MonsterManager.css'

class MonsterManager extends Component {
	constructor(props) {
		super(props)
		this.state = {
			monsterName: '',
			monsters: []
		}
	}

	componentDidMount() {
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
		catch {
			console.warn('Failed to load monsters from local storage')
		}
	}

	storeMonstersToLocal() {
		if (!window.localStorage) {
			return
		}
		window.localStorage.setItem('summ-go.monsters', JSON.stringify(this.state.monsters))
	}

	render() {
		return (
			<article className="monster-manager">
				<h2>Monster Manager</h2>
				<section className="monster-storage">
					{this.state.monsters.length === 0 && <p>No monsters</p>}
					{this.state.monsters.length > 0 &&
					<ul>
						{this.state.monsters.map(monster =>
							<li key={monster.name}>{monster.name}</li>)}
					</ul>}
				</section>
				<form onSubmit={this.addMonster}>
					<section>
						<label htmlFor="mon-name">Name</label>
						<input
							id="mon-name"
							name="mon-name"
							type="text"
							onChange={this.onMonsterNameChange}
							value={this.state.monsterName} />
					</section>
					<input type="submit" value="Add Monster" />
				</form>
			</article>
		)
	}

	addMonster = (evt) => {
		evt.preventDefault()
		if (!this.state.monsterName || this.state.monsterName === '') {
			alert('Monster name required')
			return
		}
		const updatedMonsters = [...this.state.monsters].concat({ name: this.state.monsterName })
		this.setState({ monsterName: '', monsters: updatedMonsters })
	}

	onMonsterNameChange = ({ target: { value } }) => this.setState({ monsterName: value })
}

export { MonsterManager }
