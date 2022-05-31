
import {objectMap} from "@chasemoskal/snapstate"

import {AppState} from "../../app-snap.js"
import {User} from "../../../../api/types/auth.js"
import {hitch} from "../../../../toolbox/hitch.js"
import {computeNestedComments as computeNestedComments} from "./compute-nested-comments/compute-nested-comments.js"
import {CommentPost, CommentEditDraft, Score, ScoreDraft} from "../../../../api/types/concepts.js"

export function makeCommentStateActions({state}: {
		state: AppState
	}) {

	const map = new Map<string, CommentPost>()

	function recomputeNestedComments() {
		state.comments.nestedComments = computeNestedComments(
			[...map.values()],
			{
				scores: [...state.comments.scores],
				users: [...state.users],
			},
		)
	}

	const userIsNew = (user: User) => !state.users.find(u => u.id === user.id)
	const scoreIsNew = (score: Score) => !state.comments.scores.find(s => s.id === score.id)

	const actions = {
		wipeComments() {
			map.clear()
		},
		addUsers(users: User[]) {
			const newUsers = users.filter(userIsNew)
			state.users = [...state.users, ...newUsers]
		},
		addComments(comments: CommentPost[]) {
			for (const comment of comments)
				map.set(comment.id, comment)
		},
		updateComment(draft: CommentEditDraft) {
			const comment = map.get(draft.id)
			if (!comment)
				throw new Error(`cannot edit missing comment ${draft.id}`)
			comment.body = draft.body
			comment.subject = draft.subject
		},
		addScores(scores: Score[]) {
			const newScore = scores.filter(scoreIsNew)
			state.comments.scores = [...state.comments.scores, ...newScore]
		},
		updateScores(commentId: string, scoreDrafts: undefined | ScoreDraft[]) {
			const scores: undefined | Score[] = scoreDrafts
				? scoreDrafts.map(s => ({...s, commentId} as Score))
				: undefined
			const existingScoresRemoved = state.comments.scores
				.filter(s => s.commentId !== commentId)
			state.comments.scores = [
				...existingScoresRemoved,
				...(scores ?scores :[]),
			]
		},
		archiveComments(ids: string[]) {
			for (const id of ids) {
				const comment = map.get(id)
				if (!comment)
					throw new Error(`cannot archive missing comment ${id}`)
				comment.archived = true
			}
		},
		setScoreAspects(aspects: string[]) {
			state.comments.scoreAspects = [...aspects]
		},
	}

	return <typeof actions>objectMap(
		actions,
		f => hitch.after(f, recomputeNestedComments),
	)
}
