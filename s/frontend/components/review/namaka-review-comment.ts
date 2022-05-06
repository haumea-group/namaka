import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"
import binSvg from "../../../icons/feather-Icons/bin.svg.js"
import infoSquareSvg from "../../../icons/info-square.svg.js"
import dangerSvg from "../../../icons/feather-Icons/danger.svg.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaReviewCommentCss from "./namaka-review-comment.css.js"
import {randomComment, randomSubject} from "../../../toolbox/randomly.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"
// import {makeTopicModel} from "../../models/commenting/topic/topic-model.js"

@mixinStyles(namakaReviewCommentCss)
export class NamakaReviewComment extends mixinStandard<{
		commenting: ReturnType<typeof makeCommentingModel>
	}>()(LitElement) {
	
	@property()
	private showDropDown: boolean = false

	@property({type: String})
	id: string = undefined as any

	@property({type: String})
	topicId: string = undefined as any

	@property({type: String})
  subject: string = randomSubject()
	
	@property({type: String})
  body: string = randomComment()

	@property({type: String})
  timePosted: string = "1 hour ago"

	// #topicModel: ReturnType<typeof makeCommentingModel> = undefined as any
	async firstUpdated() {
		console.log(this.topicId)
		if (!this.topicId)
			throw new Error("topic attribute is required")
			await this.context.commenting.downloadComments(this.topicId)
	}

	#postRandomComment = async() => {
		await this.context.commenting.postComment({
			topicId: this.topicId,
			parentCommentId: this.id,
			subject: randomSubject(),
			body: [randomComment(), randomComment(), randomComment()].join(" "),
		})
	}

	#toggleDropDown = () => {
		this.showDropDown = !this.showDropDown
	}

	#renderDropDown = () => {
		return html`
			<div class="drop-down">
				<div class="report">
					${infoSquareSvg}
					<button>Report user</button>
				</div>
				<div class="suspend">
					<span>${dangerSvg}</span>
					<button>Suspend user</button>
				</div>
				<div class="delete">
					<span>${binSvg}</span>
					<button>Delete Review</button>
				</div>
			</div>
	`}

	render() {
		return html`
			<div class="outer-div">
				<div class="box">
					<div class="avatar"></div>
					<div class="header">
						<div class="header__txt">
							<p>Francesca20</p>
							<li><span>${this.subject}</span></li>
						</div>
						<div class="header__btn">
							<button @click=${this.#toggleDropDown} class="drop-down__btn">
								&bull;&bull;&bull;
							</button>
						</div>
					</div>
				</div>
				
				<div class="inner-div">
					<div class="header">
						<div class="header__txt">
							<p>Francesca20</p>
							<li><span>${this.subject}</span></li>
						</div>
						<div class="header__btn">
							<button @click=${this.#toggleDropDown} class="drop-down__btn">
								&bull;&bull;&bull;
							</button>
						</div>
					</div>
					<p>${this.body}</p>
					<div class="footer">
						<p class="time-stamp">${this.timePosted}</p>
						<li><span>12 comments</span></li>
						<button @click=${this.#postRandomComment}>Reply</button>
					</div>
				</div>
			</div>
			<slot></slot>
			${this.showDropDown ? this.#renderDropDown() : null}
		`
	}
}
