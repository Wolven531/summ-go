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
	constructor(name, awakenedName, element, stars, awakenedImage) {
		this.name = name
		this.awakenedName = awakenedName
		this.element = element
		this.stars = stars
		this.awakenedImage = awakenedImage
	}
}

export { Monster }
