const capitalize = (str) => {
	if (!str || str.length < 1) {
		return str
	}
	const firstLetter = str[0]
	const remainder = str.substr(1)

	return firstLetter.toUpperCase() + remainder
}

export { capitalize }
