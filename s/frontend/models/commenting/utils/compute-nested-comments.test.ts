
import {Suite, expect} from "cynic"

import {CommentPost} from "../../../../api/types/concepts.js"
import {randomId} from "../testing/commenting-test-setups.js"
import {computeCommentTree} from "./compute-nested-comments.js"

function makeComment(
		topicId: string,
		parentCommentId: string | undefined = undefined,
	): CommentPost {
	return {
		topicId,
		authorId: randomId(),
		id: randomId(),
		parentCommentId,
		subject: "subject " + randomId(),
		body: "body " + randomId(),
		timePosted: Date.now(),
		archived: false,
	}
}

export default <Suite>{

	async "same comments come out, as went in"() {
		const topicId = randomId()
		const tree = computeCommentTree([
			makeComment(topicId),
			makeComment(topicId),
			makeComment(topicId),
		])
		expect(tree.length).equals(3)
	},

	async "child comments are nested under root comments"() {
		const topicId = randomId()
		const parentComment = makeComment(topicId)
		const childComment = makeComment(topicId, parentComment.id)
		const tree = computeCommentTree([
			parentComment,
			childComment,
		])
		expect(tree.length).equals(1)
		expect(tree[0].children.length).equals(1)
	},
}
