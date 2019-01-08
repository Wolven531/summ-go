import React, { Component } from 'react'

import './MonsterManager.css'

class MonsterManager extends Component {
	constructor(props) {
		super(props)
		this.state = {
			monsterName: '',
			monsterStars: 3,
			monsters: []
		}
	}

	componentDidMount() {
		window.document.title = 'Monster Manager | Summ Go'
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
				<section>
					<button
						className="store-to-local"
						onClick={this.storeMonstersToLocal}>Store in Local Storage</button>
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
					<section>
						{[1,2,3,4,5].map(num => <p key={`star-${num}`}>
							<label htmlFor={`monster-star-${num}`}>{num}</label>
							<input
								type="radio"
								name="monster-stars"
								id={`monster-star-${num}`}
								checked={this.state.monsterStars === num}
								onChange={this.onMonsterStarsChange}
								value={num} />
						</p>)}
					</section>
					<input className="add-monster" type="submit" value="Add Monster" />
				</form>
				<section>
					<button
						className="clear-monsters"
						onClick={this.clearMonsters}>Clear Current Monsters</button>
				</section>
			</article>
		)
	}

	addMonster = evt => {
		evt.preventDefault()
		if (!this.state.monsterName || this.state.monsterName === '') {
			alert('Monster name required')
			return
		}
		const updatedMonsters = [...this.state.monsters].concat({ name: this.state.monsterName })
		this.setState({ monsterName: '', monsters: updatedMonsters })
	}

	clearMonsters = () => this.setState({ monsters: [] })

	onMonsterNameChange = ({ target: { value } }) => this.setState({ monsterName: value })

	onMonsterStarsChange = ({ target: { value } }) => this.setState({ monsterStars: parseInt(value, 10) })

	storeMonstersToLocal = () => {
		if (!window.localStorage) {
			return
		}
		window.localStorage.setItem('summ-go.monsters', JSON.stringify(this.state.monsters))
		alert('Saved')
	}
}

export { MonsterManager }
