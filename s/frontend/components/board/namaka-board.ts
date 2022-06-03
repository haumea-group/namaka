import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {makeAuthModel} from "../../models/auth/auth-model.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {randomComment, randomSubject} from "../../../toolbox/randomly.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"
import {recursivelyRenderComments} from "./utils/recursively-render-comments.js"

import namakaCommentsCss from "./namaka-board.css.js"
import {ModalControls} from "../modals/modal-types.js"
import {postModalView} from "../modals/views/post-modal-view.js"

@mixinStyles(namakaCommentsCss)
export class NamakaBoard extends mixinStandard<{
		modals: ModalControls
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
		const {scoreAspects} = await this.context.commenting.fetchScoreAspects()
		await this.context.commenting.postComment({
			topicId: this.topic!,
			parentCommentId: undefined,
			subject: randomSubject(),
			body: [randomComment(), randomComment(), randomComment()].join(" "),
			scores: scoreAspects.map(aspect => ({
				aspect,
				score: Math.random() * 100,
			})),
		})
	}

	#RandomComment = async(isAReview: boolean = true) => {
		const {scoreAspects} = await this.context.commenting.fetchScoreAspects()
		const {modals} = this.context
		const result = await postModalView({modals, isAReview, scoreAspects})
		if(result){
			await this.context.commenting.postComment({
				topicId: this.topic!,
				parentCommentId: undefined,
				subject: randomSubject(),
				body: [randomComment(), randomComment(), randomComment()].join(" "),
				scores: scoreAspects.map(aspect => ({
					aspect,
					score: Math.random() * 100,
				})),
			})
		}
	}

	render() {
		if (!this.topic)
			return null

		const isLoggedIn = !!this.context.auth.user
		const comments = this.context.commenting.getComments(this.topic)
		
		return html`
			<section>
				<div class=buttons>
					<button
						@click=${this.#postRandomComment}
						?disabled=${!isLoggedIn}>
							post a comment
					</button>
					<button
						@click=${this.#RandomComment}
						?disabled=${!isLoggedIn}>
							post review
					</button>
				</div>
				<div class=comments>
					${recursivelyRenderComments(comments)}
				</div>
			</section>
		`
	}
}
