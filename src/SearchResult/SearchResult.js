import React from 'react'

import { capitalize } from '../util'

const SearchResult = (props) => {
	const { mon, onClick } = props

	return (
		<div className="search-result" onClick={onClick}>
			<img src={`data:image/png;base64,${mon.awakenedImage}`}
				alt={`Awakened portrait for ${mon.awakenedName}`} />
			<br/>
			{mon.awakenedName}
			(<span className="element">{capitalize(mon.element)}</span> {mon.name})
		</div>
	)
}

export { SearchResult }
