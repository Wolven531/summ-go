import React, { Component } from 'react'

import './MonsterManager.css'

class MonsterManager extends Component {
	constructor(props) {
		super(props)
		this.state = {
			monsterName: ''
		}
	}

	render() {
		return (
			<article className="monster-manager">
				<h2>Monster Manager</h2>
				<form onSubmit={this.addMonster}>
					<section>
						<label htmlFor="mon-name">Name</label>
						<input
							id="mon-name"
							name="mon-name"
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
		this.setState({ monsterName: '' })
	}

	onMonsterNameChange = (evt) => {
		this.setState({ monsterName: evt.target.value })
	}
}

export { MonsterManager }
