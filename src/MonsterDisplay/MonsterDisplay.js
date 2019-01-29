import * as React from 'react'

// import { Monster } from '../Models/Monster'
import { capitalize } from '../util'

import './MonsterDisplay.css'

const MonsterDisplay = ({ monster }) => (
	<article className="monster-display">
		<h3>{monster.awakenedName}</h3>
		<section className="monster-stars">
			{monster.stars}
		</section>
		<section className="element">
			{capitalize(monster.element.toString())}
		</section>
	</article>
)

export {
	MonsterDisplay
}
