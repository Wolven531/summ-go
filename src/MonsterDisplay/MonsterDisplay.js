import * as React from 'react'

// import { Monster } from '../Models/Monster'

const MonsterDisplay = ({ monster }) => (
	<article>
		<h3>{monster.name}</h3>
		<section>
			{monster.stars}
		</section>
	</article>
)

export {
	MonsterDisplay
}
