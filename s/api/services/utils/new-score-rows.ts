
import * as dbmage from "dbmage"

import {ScoreRow} from "../../types/schema.js"
import {ScoreDraft} from "../../types/concepts.js"

export function newScoreRows({rando, commentId, scoreDrafts}: {
		rando: dbmage.Rando
		commentId: dbmage.Id
		scoreDrafts: ScoreDraft[]
	}): ScoreRow[] {

	return scoreDrafts.map(draft => ({
		commentId,
		id: rando.randomId(),
		aspect: draft.aspect,
		score: draft.score,
		archived: false,
	}))
}
