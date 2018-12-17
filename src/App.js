import React, { Component } from 'react'

import { MonsterManager } from './MonsterManager'

import './App.css'

class App extends Component {
	render() {
		return (
			<article className="app">
				<h1>Summ Go</h1>
				<MonsterManager />
			</article>
		)
	}
}

export { App }
