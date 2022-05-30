
export function howLongAgo(time: number) {
	const elapsed = Math.floor((Date.now() - time)/1000)
	if (Date.now() - time < 1001)
		return null
	else
		return `${prettify(elapsed)} ago`
}

const prettify = (timeInSeconds: number) => {
	if (timeInSeconds < 60) {
		return `${timeInSeconds} second${timeInSeconds > 1 ? "s" : ""}`
	} else if (timeInSeconds > 60 && timeInSeconds < 3600) {
		const val = Math.floor(timeInSeconds / 60)
		return`${val} minute${val>1 ? "s" : ""}`
	} else if (timeInSeconds > 3600 && timeInSeconds < 86400) {
		const val = Math.floor(timeInSeconds / 3600)
		return`${val} hour${val>1 ? "s" : ""}`
	} else {
		const val = Math.floor(timeInSeconds / 86400)
		return`${val} day${val>1 ? "s" : ""}`
	}
}
