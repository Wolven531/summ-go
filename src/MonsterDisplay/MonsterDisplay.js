import * as React from 'react'

import { capitalize } from '../util'

import './MonsterDisplay.css'

const MonsterDisplay = ({ monster }) => {
	const {
		awakenedName,
		element,
		name,
		stars
	} = monster
	const elementDisplay = capitalize(element.toString())

	return (
		<article className="monster-display">
			<h3>{awakenedName} ({elementDisplay} {name})</h3>
			<section className="monster-stars">
				{stars}
			</section>
			<section className="element">
				{elementDisplay}
			</section>
		</article>
	)
}

export {
	MonsterDisplay
}
