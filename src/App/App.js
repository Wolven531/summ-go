import React, { Component } from 'react'

import { MonsterManager } from '../MonsterManager/MonsterManager'

import './App.css'

class App extends Component {
	render() {
		return (
			<article className="app">
				<div class="header">
					<h1>Summ Go</h1>
				</div>
				<div class="sidebar">
					sidebar
				</div>
				<div class="content-1">
					<MonsterManager />
				</div>
				<div class="content-2">Content-2</div>
				<div class="content-3">Content-3</div>
				<div class="footer">&copy; Anthony Williams 2019</div>
			</article>
		)
	}
}

export { App }
