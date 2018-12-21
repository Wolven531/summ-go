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

	render() {
		return (
			<article className="monster-manager">
				<h2>Monster Manager</h2>
				<section className="monster-storage">
					{this.state.monsters.length === 0 && <p>No monsters</p>}
					{this.state.monsters.length > 0 &&
					<ul>
						{this.state.monsters.map(monster => <li>{monster.name}</li>)}
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

	onMonsterNameChange = (evt) => {
		this.setState({ monsterName: evt.target.value })
	}
}

export { MonsterManager }
