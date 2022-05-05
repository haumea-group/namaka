
import {Suite, expect} from "cynic"
import {User} from "../../../api/types/auth.js"
import {newServer, randomId} from "./testing/commenting-test-setups.js"

export function makeRegularUser(): User {
	return {
		userId: randomId(),
		permissions: {
			canPost: true,
			canBanUsers: false,
			canDeleteAnyComment: false,
		},
		profile: {
			nickname: "Jimmy",
			avatar: "fake-image",
			joinedTime: Date.now() - (1000 * 60 * 60),
		},
	}
}

export default <Suite>{

	"posting and reading comments": {
		"a logged-in user": {

			async "can post a comment, and see it appear"() {
				const {commenting, helpers} = newServer()
					.newUser(makeRegularUser())
					.newBrowserTab()
				const topicId = randomId()
				const topic = commenting.getTopicModel(topicId)
				expect(helpers.commentTree.length).equals(0)
				await topic.postComment({
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(helpers.commentTree.length).equals(1)
				expect(helpers.commentTree[0].subject).equals("hello")
				expect(helpers.commentTree[0].body).equals("world")
			},
			async "can post a comment that another user can see"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting, helpers} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.postComment({
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(helpers.commentTree.length).equals(1)
				}
				{
					const {commenting, helpers} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.getComments()
					expect(helpers.commentTree.length).equals(1)
				}
			},
	
		},
		"a logged-out user": {

			async "cannot post a comment, and does not see it appear"() {
				const {commenting, helpers} = newServer()
					.newUser(undefined)
					.newBrowserTab()
				const topicId = randomId()
				const topic = commenting.getTopicModel(topicId)
				await expect(async() => topic.postComment({
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})).throws()
				expect(helpers.commentTree.length).equals(0)
			},
			async "can comment posted by other users"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting, helpers} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.postComment({
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(helpers.commentTree.length).equals(1)
				}
				{
					const {commenting} = server
						.newUser(undefined)
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.getComments()
					expect(topic.comments.length).equals(1)
				}
			},
	
		},
		"multi-user interactions": {

			async "a logged-out user can see a previous comment from a logged-in user"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting, helpers} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.postComment({
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(helpers.commentTree.length).equals(1)
				}
				{
					const {commenting, helpers} = server
						.newUser(undefined)
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.getComments()
					expect(helpers.commentTree.length).equals(1)
				}
			},

		},
	},
	"editing comments": {
		"a regular user": {
			async "can edit their own comment, instantly sees change"() {
				const {commenting} = newServer()
					.newUser(makeRegularUser())
					.newBrowserTab()
				const topicId = randomId()
				const topic = commenting.getTopicModel(topicId)
				const comment = await topic.postComment({
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(topic.comments[0].subject).equals("hello")
				expect(topic.comments[0].body).equals("world")
				await commenting.editComment({
					id: comment.id,
					subject: comment.subject + "!",
					body: comment.body + "!",
				})
				expect(topic.comments[0].subject).equals("hello!")
				expect(topic.comments[0].body).equals("world!")
			},
			async "can edit their own comment, sees change after refresh"() {
				const context = newServer()
					.newUser(makeRegularUser())
				const {commenting} = context.newBrowserTab()
				const topicId = randomId()
				const topic = commenting.getTopicModel(topicId)
				const comment = await topic.postComment({
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(topic.comments[0].subject).equals("hello")
				expect(topic.comments[0].body).equals("world")
				await commenting.editComment({
					id: comment.id,
					subject: comment.subject + "!",
					body: comment.body + "!",
				})
				{
					const {commenting} = context.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.getComments()
					expect(topic.comments[0].subject).equals("hello!")
					expect(topic.comments[0].body).equals("world!")
				}
			},
			async "cannot edit another person's comment"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.postComment({
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
				}
				{
					const {commenting, helpers} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.getComments()
					expect(helpers.commentTree.length).equals(1)
					const [comment] = topic.comments
					await expect(async() => commenting.editComment({
						id: comment.id,
						subject: comment.subject + "!",
						body: comment.body + "!",
					})).throws()
				}
			},
		},
		"a logged-out user": {
			async "cannot edit comments"() {},
		},
		"a canEditAnyComment user": {
			async "can edit anybody's comment"() {},
		},
	},
}
