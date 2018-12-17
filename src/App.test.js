import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

describe('Summ Go application', () => {
	let applicationElement

	beforeAll(() => {
		applicationElement = document.createElement('div')
	})

	it('renders without crashing', () => {
		ReactDOM.render(<App />, applicationElement)
	})

	afterAll(() => {
		ReactDOM.unmountComponentAtNode(applicationElement)
	})
})
