
import {Suite, expect} from "cynic"
import {ApiError, RenrakuError} from "renraku"
import {User} from "../../../api/types/auth.js"
import {newServer, randomId} from "./testing/commenting-test-setups.js"

import computeNestedCommentsTest from "./utils/compute-nested-comments/compute-nested-comments.test.js"

export function makeRegularUser(): User {
	return {
		id: randomId(),
		permissions: {
			canPost: true,
			canBanUsers: false,
			canListBanUsers: false,
			canUnbanUsers: false,
			canEditAnyComment: false,
			canArchiveAnyComment: false,
		},
		profile: {
			nickname: "Jimmy",
			avatar: "fake-image",
			joinedTime: Date.now() - (1000 * 60 * 60),
		},
	}
}

export function makeAdminUser(): User {
	return {
		id: randomId(),
		permissions: {
			canPost: true,
			canBanUsers: true,
			canUnbanUsers: true,
			canListBanUsers: true,
			canEditAnyComment: true,
			canArchiveAnyComment: true,
		},
		profile: {
			nickname: "Jimmy Admin",
			avatar: "fake-image",
			joinedTime: Date.now() - (1000 * 60 * 60),
		},
	}
}

export default <Suite>{

	"posting and reading comments": {
		"a logged-in user": {

			async "can post a comment, and see it appear"() {
				const {commenting} = newServer()
					.newUser(makeRegularUser())
					.newBrowserTab()
				const topicId = randomId()
				expect(commenting.getComments(topicId).length).equals(0)
				await commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(commenting.getComments(topicId).length).equals(1)
				expect(commenting.getComments(topicId)[0].subject).equals("hello")
				expect(commenting.getComments(topicId)[0].body).equals("world")
			},
			async "can post a comment that another user can see"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(commenting.getComments(topicId).length).equals(1)
				}
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					expect(commenting.getComments(topicId).length).equals(1)
				}
			},
			async "can post and see a reply"() {
				const {commenting} = newServer()
					.newUser(makeRegularUser())
					.newBrowserTab()
				const topicId = randomId()
				expect(commenting.getComments(topicId).length).equals(0)
				const comment1 = await commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				await commenting.postComment({
					topicId,
					parentCommentId: comment1.id,
					subject: "hello2",
					body: "world2",
				})
				// thread comment
				expect(commenting.getComments(topicId).length).equals(1)
				expect(commenting.getComments(topicId)[0].subject).equals("hello")
				expect(commenting.getComments(topicId)[0].body).equals("world")
				// child comment
				expect(commenting.getComments(topicId)[0].children.length).equals(1)
				expect(commenting.getComments(topicId)[0].children[0].subject).equals("hello2")
				expect(commenting.getComments(topicId)[0].children[0].body).equals("world2")
			},
			async "sees the user object attached to a comment"() {
				const user = makeRegularUser()
				const {commenting} = newServer()
					.newUser(user)
					.newBrowserTab()
				const topicId = randomId()
				expect(commenting.getComments(topicId).length).equals(0)
				await commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(commenting.getComments(topicId).length).equals(1)
				expect(commenting.getComments(topicId)[0].user).ok()
				expect(commenting.getComments(topicId)[0].user.id).equals(user.id)
			},

		},
		"a logged-out user": {

			async "cannot post a comment, and does not see it appear"() {
				const {commenting} = newServer()
					.newUser(undefined)
					.newBrowserTab()
				const topicId = randomId()
				await expect(async() => commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})).throws()
				expect(commenting.getComments(topicId).length).equals(0)
			},
			async "can read a comment posted by other user"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(commenting.getComments(topicId).length).equals(1)
				}
				{
					const {commenting} = server
						.newUser(undefined)
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					expect(commenting.getComments(topicId).length).equals(1)
				}
			},
	
		},
		"multi-user interactions": {

			async "a logged-out user can see a previous comment from a logged-in user"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(commenting.getComments(topicId).length).equals(1)
				}
				{
					const {commenting} = server
						.newUser(undefined)
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					expect(commenting.getComments(topicId).length).equals(1)
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
				const comment = await commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(commenting.getComments(topicId)[0].subject).equals("hello")
				expect(commenting.getComments(topicId)[0].body).equals("world")
				await commenting.editComment({
					id: comment.id,
					subject: comment.subject + "!",
					body: comment.body + "!",
				})
				expect(commenting.getComments(topicId)[0].subject).equals("hello!")
				expect(commenting.getComments(topicId)[0].body).equals("world!")
			},
			async "can edit their own comment, sees change after refresh"() {
				const context = newServer()
					.newUser(makeRegularUser())
				const {commenting} = context.newBrowserTab()
				const topicId = randomId()
				const comment = await commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				expect(commenting.getComments(topicId)[0].subject).equals("hello")
				expect(commenting.getComments(topicId)[0].body).equals("world")
				await commenting.editComment({
					id: comment.id,
					subject: comment.subject + "!",
					body: comment.body + "!",
				})
				{
					const {commenting} = context.newBrowserTab()
					await commenting.downloadComments(topicId)
					expect(commenting.getComments(topicId)[0].subject).equals("hello!")
					expect(commenting.getComments(topicId)[0].body).equals("world!")
				}
			},
			async "cannot edit non-existent comment"() {
				const server = newServer()
				const topicId = randomId()
				const {commenting} = server
					.newUser(makeRegularUser())
					.newBrowserTab()
				const fakeCommentId = randomId()
				await expect(async() => commenting.editComment({
					id: fakeCommentId,
					subject: "hello",
					body: "world",
				})).throws()
				await commenting.downloadComments(topicId)
				expect(commenting.getComments(topicId).length).equals(0)
			},
			async "cannot edit another person's comment"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
				}
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					expect(commenting.getComments(topicId).length).equals(1)
					const [comment] = commenting.getComments(topicId)
					await expect(async() => commenting.editComment({
						id: comment.id,
						subject: comment.subject + "!",
						body: comment.body + "!",
					})).throws()
				}
			},

		},
		"a logged-out user": {

			async "cannot edit comments"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
				}
				{
					const {commenting} = server
						.newUser(undefined)
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					const [comment] = commenting.getComments(topicId)
					expect(comment).defined()
					await expect(async() => commenting.editComment({
						id: comment.id,
						subject: comment.subject + "!",
						body: comment.body + "!",
					})).throws()
				}
			},

		},
		"an 'admin' user": {

			async "can edit anybody's comment"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
				}
				{
					const {commenting} = server
						.newUser(makeAdminUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					const [comment] = commenting.getComments(topicId)
					await commenting.editComment({
						id: comment.id,
						subject: comment.subject + "!",
						body: comment.body + "!",
					})
					const [editedComment] = commenting.getComments(topicId)
					expect(editedComment.subject).equals("hello!")
					expect(editedComment.body).equals("world!")
				}
			},
			async "cannot edit non-existent comment"() {
				const server = newServer()
				const topicId = randomId()
				const {commenting} = server
					.newUser(makeAdminUser())
					.newBrowserTab()
				const fakeCommentId = randomId()
				await expect(async() => commenting.editComment({
					id: fakeCommentId,
					subject: "hello",
					body: "world",
				})).throws()
				await commenting.downloadComments(topicId)
				expect(commenting.getComments(topicId).length).equals(0)
			},

		},
	},
	"archiving comments": {
		"a regular user": {

			async "can archive their own comment, sees it disappear"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					const {id} = await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(commenting.getComments(topicId).length).equals(1)
					await commenting.archiveComments([id])
				}
				{
					// other users also see the comment is gone
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					expect(commenting.getComments(topicId).length).equals(0)
				}
			},
			async "cannot archive non-existent comment"() {
				const server = newServer()
				const {commenting} = server
					.newUser(makeRegularUser())
					.newBrowserTab()
				const fakeCommentId = randomId()
				await expect(async() => commenting.archiveComments([fakeCommentId])).throws()
			},
			async "cannot archive comments when any of them don't exist"() {
				const server = newServer()
				const {commenting} = server
					.newUser(makeRegularUser())
					.newBrowserTab()
				const topicId = randomId()
				await commenting.downloadComments(topicId)
				const comment = await commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
				})
				const fakeCommentId = randomId()
				await expect(async() => commenting.archiveComments([comment.id, fakeCommentId])).throws()
				await commenting.downloadComments(topicId)
				expect(commenting.getComments(topicId).length).equals(1)
			},

		},
		"an admin user": {

			async "can archive somebody else's comment"() {
				const server = newServer()
				const topicId = randomId()
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					await commenting.postComment({
						topicId,
						parentCommentId: undefined,
						subject: "hello",
						body: "world",
					})
					expect(commenting.getComments(topicId).length).equals(1)
				}
				{
					const {commenting} = server
						.newUser(makeAdminUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					const [comment] = commenting.getComments(topicId)
					expect(comment).ok()
					await commenting.archiveComments([comment.id])
					expect(commenting.getComments(topicId).length).equals(0)
				}
				{
					const {commenting} = server
						.newUser(makeRegularUser())
						.newBrowserTab()
					await commenting.downloadComments(topicId)
					expect(commenting.getComments(topicId).length).equals(0)
				}
			},
			async "cannot archive non-existent comment"() {
				const {commenting} = newServer()
					.newUser(makeAdminUser())
					.newBrowserTab()
				const fakeCommentIds = [randomId(), randomId()]
				await expect(async() => commenting.archiveComments(fakeCommentIds)).throws()
			},
			async "cannot archive an empty array of comment ids"() {
				const {commenting} = newServer()
					.newUser(makeAdminUser())
					.newBrowserTab()
				let error: undefined | ApiError
				try {
					await commenting.archiveComments([])
				}
				catch (err) {
					if (err instanceof ApiError)
						error = err
				}
				expect(error?.code).equals(400)
			},
		}
	},

	"posting reviews with scores": {
		"a logged-in user": {

			async "can post a review, with a score, and see it"() {
				const {commenting} = newServer()
					.newUser(makeRegularUser())
					.newBrowserTab()
				const topicId = randomId()
				expect(commenting.getComments(topicId).length).equals(0)
				await commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
					scores: [
						{aspect: "flavor", score: 50},
						{aspect: "presentation", score: 60},
					],
				})
				expect(commenting.getComments(topicId).length).equals(1)
				expect(commenting.getComments(topicId)[0].scoring).ok()
				expect(commenting.getComments(topicId)[0].scoring?.scores).ok()
				expect(commenting.getComments(topicId)[0].scoring?.average).equals(55)
			},

			async "can post a review, and see it in a new tab"() {
				const user = newServer().newUser(makeRegularUser())
				const tab1 = user.newBrowserTab()
				const topicId = randomId()
				await tab1.commenting.postComment({
					topicId,
					parentCommentId: undefined,
					subject: "hello",
					body: "world",
					scores: [
						{aspect: "flavor", score: 50},
						{aspect: "presentation", score: 60},
					],
				})
				const tab2 = user.newBrowserTab()
				await tab2.commenting.downloadComments(topicId)
				expect(tab2.commenting.getComments(topicId).length).equals(1)
				expect(tab2.commenting.getComments(topicId)[0].scoring).ok()
				expect(tab2.commenting.getComments(topicId)[0].scoring?.scores).ok()
				expect(tab2.commenting.getComments(topicId)[0].scoring?.average).equals(55)
			},
		},
	},

	"board stats": {
		async "work on board with a single review"() {
			const {commenting} = newServer()
				.newUser(makeRegularUser())
				.newBrowserTab()
			const topicId = randomId()
			await commenting.postComment({
				topicId,
				subject: "hello",
				body: "rofl",
				parentCommentId: undefined,
				scores: [
					{score: 40, aspect: "flavor"},
					{score: 50, aspect: "presentation"},
					{score: 60, aspect: "service"},
				],
			})
			const stats = await commenting.getTopicStats(topicId)
			expect(stats.threadCount).equals(1)
			expect(stats.replyCount).equals(0)
			expect(stats.scoring).ok()
			expect(stats.scoring?.averageScore).equals(50)
		},
		async "work on board with two reviews"() {
			const {commenting} = newServer()
				.newUser(makeRegularUser())
				.newBrowserTab()
			const topicId = randomId()
			await commenting.postComment({
				topicId,
				subject: "hello",
				body: "rofl",
				parentCommentId: undefined,
				scores: [
					{score: 40, aspect: "flavor"},
					{score: 50, aspect: "presentation"},
					{score: 60, aspect: "service"},
				],
			})
			await commenting.postComment({
				topicId,
				subject: "hello",
				body: "rofl",
				parentCommentId: undefined,
				scores: [
					{score: 50, aspect: "flavor"},
					{score: 60, aspect: "presentation"},
					{score: 70, aspect: "service"},
				],
			})
			const stats = await commenting.getTopicStats(topicId)
			expect(stats.threadCount).equals(2)
			expect(stats.replyCount).equals(0)
			expect(stats.scoring).ok()
			expect(stats.scoring?.averageScore).equals(55)
		},
	},

	utils: {computeNestedCommentsTest},
}
