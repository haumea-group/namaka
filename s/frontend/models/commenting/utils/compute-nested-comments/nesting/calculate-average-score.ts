
import {Score} from "../../../../../../api/types/concepts.js"

export function calculateAverageScore(scores: Score[]) {
	if (scores.length) {
		let sum = 0
		for (const {score} of scores)
			sum += score
		return sum / scores.length
	}
	else
		return 0
}
