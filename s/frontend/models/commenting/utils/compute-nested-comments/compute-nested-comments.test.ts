
import {Suite, expect} from "cynic"
import {User} from "../../../../../api/types/auth.js"

import {CommentPost} from "../../../../../api/types/concepts.js"
import {randomId} from "../../testing/commenting-test-setups.js"
import {computeNestedComments} from "./compute-nested-comments.js"

function makeUser(): User {
	return {
		id: randomId(),
		permissions: {
			canArchiveAnyComment: true,
			canBanUsers: true,
			canUnbanUsers: true,
			canListBanUsers: true,
			canEditAnyComment: true,
			canPost: true,
		},
		profile: {
			nickname: "bob",
			avatar: "",
			joinedTime: Date.now(),
		},
	}
}

function makeComment(
		authorId: string,
		topicId: string,
		parentCommentId: string | undefined = undefined,
	): CommentPost {
	return {
		topicId,
		authorId,
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
		const user = makeUser()
		const tree = computeNestedComments([
			makeComment(user.id, topicId),
			makeComment(user.id, topicId),
			makeComment(user.id, topicId),
		], {users: [user], scores: []})
		expect(tree.length).equals(3)
	},

	async "comments have the user object attached"() {
		const topicId = randomId()
		const userA = makeUser()
		const userB = makeUser()
		const tree = computeNestedComments([
			makeComment(userA.id, topicId),
			makeComment(userB.id, topicId),
		], {users: [userA, userB], scores: []})
		expect(tree.length).equals(2)
		expect(tree[0].user.id).equals(userA.id)
		expect(tree[1].user.id).equals(userB.id)
		expect(tree[0].user).equals(userA)
		expect(tree[1].user).equals(userB)
	},

	async "child comments are nested under root comments"() {
		const topicId = randomId()
		const user = makeUser()
		const parentComment = makeComment(user.id, topicId)
		const childComment = makeComment(user.id, topicId, parentComment.id)
		const tree = computeNestedComments([
			parentComment,
			childComment,
		], {users: [user], scores: []})
		expect(tree.length).equals(1)
		expect(tree[0].children.length).equals(1)
	},
}
