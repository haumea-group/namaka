
import {Suite, expect} from "cynic"
import {newServer, randomId} from "./testing/commenting-test-setups.js"

export default <Suite>{
	"commenting functionality": {
		"a logged-in user": {
	
			async "can post a comment, and see it appear"() {
				const {commenting, helpers} = newServer()
					.newUser(randomId())
					.newBrowserTab()
				const topicId = randomId()
				const topic = commenting.getTopicModel(topicId)
				expect(helpers.allComments.length).equals(0)
				await topic.postComment({
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(helpers.allComments.length).equals(1)
				expect(helpers.allComments[0].subject).equals("hello")
				expect(helpers.allComments[0].body).equals("world")
			},
			async "can post a comment that another user can see"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting, helpers} = server
						.newUser(randomId())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.postComment({
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(helpers.allComments.length).equals(1)
				}
				{
					const {commenting, helpers} = server
						.newUser(randomId())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.getComments()
					expect(helpers.allComments.length).equals(1)
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
				expect(helpers.allComments.length).equals(0)
			},

		},
		"multi-user interactions": {

			async "a logged-out user can see a previous comment from a logged-in user"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting, helpers} = server
						.newUser(randomId())
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.postComment({
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(helpers.allComments.length).equals(1)
				}
				{
					const {commenting, helpers} = server
						.newUser(undefined)
						.newBrowserTab()
					const topic = commenting.getTopicModel(topicId)
					await topic.getComments()
					expect(helpers.allComments.length).equals(1)
				}
			},

		},
	},
}
