
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {makeTopicModel} from "../../models/commenting/topic/topic-model.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"

import namakaCommentsCss from "./namaka-comments.css.js"

@mixinStyles(namakaCommentsCss)
export class NamakaComments extends mixinStandard<{
		commentingModel: ReturnType<typeof makeCommentingModel>
	}>()(LitElement) {

	get state() {
		return this.context.commentingModel.snap.readable
	}

	@property({type: String})
	topic?: string

	#topicModel: ReturnType<typeof makeTopicModel> = <any>undefined

	async firstUpdated() {
		if (!this.topic)
			throw new Error("topic attribute is required")
		this.#topicModel = this.context.commentingModel.getTopicModel(this.topic)
		await this.#topicModel.getComments()
	}

	#postRandomComment = async() => {
		await this.#topicModel.postComment({
			parentCommentId: undefined,
			subject: `hello`,
			body: `world`,
		})
	}

	#clearLocalStorage = async() => {
		window.localStorage.clear()
		await this.#topicModel.getComments()
	}

	render() {
		const {allComments} = this.state
		return html`
			<p>topic id: ${this.topic}</p>
			<div>
				<button @click=${this.#postRandomComment}>post random comment</button>
				<button @click=${this.#clearLocalStorage}>clear localstorage</button>
			</div>
			<ol>
				${allComments.map(comment => html`
					<li>
						<p>id: ${comment.id}</p>
						<p>subject: ${comment.subject}</p>
						<p>body: ${comment.body}</p>
						<p>time posted: ${comment.timePosted}</p>
					</li>
				`)}
			</ol>
		`
	}
}
