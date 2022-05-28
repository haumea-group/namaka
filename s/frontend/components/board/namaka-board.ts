import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {makeAuthModel} from "../../models/auth/auth-model.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {randomComment, randomSubject} from "../../../toolbox/randomly.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"
import {recursivelyRenderComments} from "./utils/recursively-render-comments.js"

import namakaCommentsCss from "./namaka-board.css.js"

@mixinStyles(namakaCommentsCss)
export class NamakaBoard extends mixinStandard<{
		auth: ReturnType<typeof makeAuthModel>
		commenting: ReturnType<typeof makeCommentingModel>
	}>()(LitElement) {

	@property({type: String})
	topic?: string

	async firstUpdated() {
		if (!this.topic)
			throw new Error("topic attribute is required")
		await this.context.commenting.downloadComments(this.topic)
	}

	#postRandomComment = async() => {
		await this.context.commenting.postComment({
			topicId: this.topic!,
			parentCommentId: undefined,
			subject: randomSubject(),
			body: [randomComment(), randomComment(), randomComment()].join(" "),
			scores: [
				{aspect: "flavor", score: Math.random() * 100},
				{aspect: "presentation", score: Math.random() * 100},
			],
		})
	}

	render() {
		if (!this.topic)
			return null

		const isLoggedIn = !!this.context.auth.user
		const comments = this.context.commenting.getComments(this.topic)
		
		return html`
			<div part="container">
				<div>
					<button
						@click=${this.#postRandomComment}
						?disabled=${!isLoggedIn}>
							post a comment
					</button>
				</div>
				${recursivelyRenderComments(comments)}
			</div>
		`
	}
}
