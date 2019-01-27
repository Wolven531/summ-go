class Monster {
	/*
		"awakenedName"
		"earlyRuneList"
		"earlyRuneValues"
		"element"
		"lateRuneList"
		"lateRuneValues"
		"name"
		"rating"
		"statPriority"
		"awakenedImage"
		"awakenedImageSource"
		"image"
		"imageSource"
	*/
	constructor(name, awakenedName, element, stars) {
		this.name = name
		this.awakenedName = awakenedName
		this.element = element
		this.stars = stars
	}
}

export { Monster }
