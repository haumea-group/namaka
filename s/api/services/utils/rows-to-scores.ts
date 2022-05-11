
import {Score} from "../../types/concepts.js"
import {ScoreRow} from "../../types/schema.js"

export function rowsToScores(rows: ScoreRow[]) {
	return rows.map(row => (<Score>{
		id: row.id.string,
		commentId: row.commentId.string,
		aspect: row.aspect,
		score: row.score,
	}))
}
