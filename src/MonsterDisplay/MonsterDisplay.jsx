import * as React from 'react'
import PropTypes from 'prop-types'

import { Monster } from '../Models/Monster'

import { capitalize } from '../util'

import './MonsterDisplay.css'

const MonsterDisplay = ({ monster }) => {
	const {
		awakenedImage,
		awakenedName,
		element,
		name,
		stars
	} = monster
	const elementDisplay = capitalize(element.toString())

	return (
		<article className="monster-display">
			<h3>{awakenedName} ({elementDisplay} {name})</h3>
			<img src={`data:image/png;base64,${awakenedImage}`} alt={`Awakened portrait for ${awakenedName}`} />
			<section className="monster-stars">
				{stars}
			</section>
			<section className="element">
				{elementDisplay}
			</section>
		</article>
	)
}

MonsterDisplay.propTypes = {
	monster: PropTypes.instanceOf(Monster)
}

export {
	MonsterDisplay
}
