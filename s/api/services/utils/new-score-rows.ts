
import * as dbmage from "dbmage"

import {ScoreRow} from "../../types/schema.js"
import {ScoreDraft} from "../../types/concepts.js"

export function newScoreRows({topicId, rando, commentId, scoreDrafts}: {
		topicId: dbmage.Id
		rando: dbmage.Rando
		commentId: dbmage.Id
		scoreDrafts: ScoreDraft[]
	}): ScoreRow[] {

	return scoreDrafts.map(draft => ({
		topicId,
		commentId,
		id: rando.randomId(),
		aspect: draft.aspect,
		score: draft.score,
		archived: false,
	}))
}
