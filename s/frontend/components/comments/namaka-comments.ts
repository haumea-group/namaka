
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {randomComment, randomSubject} from "../../../toolbox/randomly.js"
import {makeTopicModel} from "../../models/commenting/topic/topic-model.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"
import {recursivelyRenderComments} from "./utils/recursively-render-comments.js"

import namakaCommentsCss from "./namaka-comments.css.js"

@mixinStyles(namakaCommentsCss)
export class NamakaComments extends mixinStandard<{
		commenting: ReturnType<typeof makeCommentingModel>
	}>()(LitElement) {

	@property({type: String})
	topic?: string

	#topicModel: ReturnType<typeof makeTopicModel> = undefined as any

	async firstUpdated() {
		if (!this.topic)
			throw new Error("topic attribute is required")

		this.#topicModel = this.context.commenting.getTopicModel(this.topic)

		await this.#topicModel.getComments()
	}

	#postRandomComment = async() => {
		await this.#topicModel.postComment({
			parentCommentId: undefined,
			subject: randomSubject(),
			body: [randomComment(), randomComment(), randomComment()].join(" "),
		})
	}

	#clearLocalStorage = () => {
		window.localStorage.clear()
		this.context.commenting.wipe()
	}

	render() {
		if (!this.#topicModel)
			return null

		const {comments} = this.#topicModel

		return html`
			<div>
				<button @click=${this.#postRandomComment}>post a comment</button>
				<button @click=${this.#clearLocalStorage}>wipe database</button>
			</div>
			${recursivelyRenderComments(comments)}
		`
	}
}
