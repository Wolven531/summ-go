import React from 'react'
import PropTypes from 'prop-types'

import { Monster } from '../Models/Monster'

import { capitalize } from '../util'

const SearchResult = (props) => {
	const { mon, onClick } = props

	return (
		<div className="search-result" onClick={() => { onClick(mon) }}>
			<img src={`data:image/png;base64,${mon.awakenedImage}`}
				alt={`Awakened portrait for ${mon.awakenedName}`} />
			<br/>
			{mon.awakenedName}
			(<span className="element">{capitalize(mon.element)}</span> {mon.name})
		</div>
	)
}

SearchResult.propTypes = {
	mon: PropTypes.instanceOf(Monster),
	onClick: PropTypes.func
}

export { SearchResult }
