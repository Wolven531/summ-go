import React, { Component } from 'react'

import { MonsterManager } from '../MonsterManager/MonsterManager'

import './App.css'

class App extends Component {
	render() {
		return (
			<article className="app">
				<div className="header">
					<h1>Summ Go</h1>
				</div>
				<div className="sidebar">&nbsp;</div>
				<div className="content-1">
					<MonsterManager />
				</div>
				{/*
				<div className="content-2">Content-2</div>
				<div className="content-3">Content-3</div>
				*/}
				<div className="footer">&copy; Anthony Williams 2019</div>
			</article>
		)
	}
}

export { App }
