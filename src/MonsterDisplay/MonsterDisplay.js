import * as React from 'react'

// import { Monster } from '../Models/Monster'

const MonsterDisplay = ({ monster }) => (
	<article className="monster-display">
		<h3>{monster.awakenedName}</h3>
		<section className="monster-stars">
			{monster.stars}
		</section>
		<section className="monster-element">
			{monster.element}
		</section>
	</article>
)

export {
	MonsterDisplay
}
