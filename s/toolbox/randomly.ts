
function hatPuller<T>(initial: T[]) {
	let current = [...initial]
	return () => {
		if (current.length === 0)
			current = [...initial]
		const randomIndex = Math.floor(Math.random() * current.length)
		const selected = current[randomIndex]
		current.splice(randomIndex, 1)
		return selected
	}
}

const library = {
	people: hatPuller(["joe biden", "donald trump", "hillary clinton", "steven seagal", "the queen", "ronald reagan", "ronald mcdonald", "alex jones", "mr rogers", "nicki minaj"]),
	nouns: hatPuller(["turtle", "wombat", "spoon", "coffee bean", "man", "woman", "mushroom", "body of water", "sandal", "sea creature", "bottom dweller", "pasta", "disease", "salvation"]),
	adjectives: hatPuller(["fuzzy", "naked", "warm", "greasy", "cold", "unhinged", "disturbed", "menacing", "welcoming", "glorious", "seething", "hairy", "smelly", "curious", "shameless", "shameful", "colorful"]),
	verbs: hatPuller(["destroyed", "accepted", "embraced", "walked", "jumped", "earned", "imagined", "programmed", "ruined", "uplifted", "promoted", "demoted", "attacked", "smothered"]),
	hows: hatPuller(["promptly", "quietly", "peacefully", "carefully", "cheerfully", "digustingly", "unimaginatively", "disgracefully", "elegantly", "carelessly"]),
}

const word = {
	get person() {return library.people()},
	get noun() {return library.nouns()},
	get adjective() {return library.adjectives()},
	get verb() {return library.verbs()},
	get how() {return library.hows()},
}

const constructions = {
	comment: hatPuller([
		() => `i encountered a ${word.noun}, which had a ${word.adjective} appearance. i ${word.how} ${word.verb} this.`,
		() => `my ${word.noun} is literally a ${word.adjective} ${word.noun} who ${word.verb} the ${word.noun} and ${word.how} ${word.verb} my last ${word.noun}.`,
		() => `it seems ${word.person} ${word.how} ${word.verb} my ${word.noun}!`,
		() => `with some luck, the ${word.adjective} ${word.noun} won't have ${word.how} ${word.verb} ${word.person}..`,
		() => `sadly, ${word.person} ${word.verb} the ${word.noun}. it was a ${word.adjective} affair.`,
	]),
	subject: hatPuller([
		() => `${word.person} ${word.how} ${word.verb} the ${word.noun}`,
		() => `${word.adjective} ${word.person} ${word.how} ${word.verb} a ${word.noun}`,
		() => `${word.adjective}? a ${word.adjective} ${word.noun} ${word.verb} ${word.person}!`,
		() => `${word.person} ${word.how} ${word.verb} ${word.person}`,
	])
}

export function randomComment() {
	return constructions.comment()()
}

export function randomSubject() {
	return constructions.subject()()
}
