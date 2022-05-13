
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {makeAuthModel} from "../../models/auth/auth-model.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {randomComment, randomSubject} from "../../../toolbox/randomly.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"
import {FiveStarState, renderFiveStarRating} from "../common/five-stars/render-five-star-display.js"

import binSvg from "../../../icons/feather-Icons/bin.svg.js"
import infoSquareSvg from "../../../icons/info-square.svg.js"
import dangerSvg from "../../../icons/feather-Icons/danger.svg.js"
import namakaReviewCommentCss from "./namaka-review-comment.css.js"
import renderFiveStarDisplayCss from "../common/five-stars/render-five-star-display.css.js"

@mixinStyles(namakaReviewCommentCss, renderFiveStarDisplayCss)
export class NamakaReviewComment extends mixinStandard<{
		auth: ReturnType<typeof makeAuthModel>
		commenting: ReturnType<typeof makeCommentingModel>
	}>()(LitElement) {
	
	@property()
	private showDropDown: boolean = false

	@property({type: String})
	id: string = undefined as any

	@property({type: String})
	authorId: string = undefined as any

	@property({type: String})
	topicId: string = undefined as any

	@property({type: String})
	subject: string = randomSubject()
	
	@property({type: String})
	body: string = randomComment()

	@property({type: String})
	timePosted: string = "1 hour ago"

	get #canPost() {
		return !!this.context.auth.user?.permissions.canPost
	}

	@property()
	private fiveStarState: FiveStarState = {
			rating: 0,
	}

	private setFiveStarState = (state: FiveStarState) => {
			this.fiveStarState = state
	}

	async firstUpdated() {
		if (!this.topicId)
			throw new Error("topic attribute is required")
	}

	#postRandomReply = async() => {
		if (this.#canPost) {
			await this.context.commenting.postComment({
				topicId: this.topicId,
				parentCommentId: this.id,
				subject: randomSubject(),
				body: [randomComment(), randomComment(), randomComment()].join(" "),
			})
		}
	}

	#toggleDropDown = () => {
		this.showDropDown = !this.showDropDown
	}

	#renderDropDown = () => {
		const {user} = this.context.auth

		const isUserLoggedIn = !!user
		const userCanArchiveAnyComment
			= !!user?.permissions.canArchiveAnyComment

		const userIsTheAuthorOfThisComment = isUserLoggedIn
			&& user?.id === this.authorId

		const deleteButtonIsAvailable = userCanArchiveAnyComment
			|| userIsTheAuthorOfThisComment

		const archiveThisComment = async() => {
			this.#toggleDropDown()
			return this.context.commenting.archiveComment(this.id)
		}

		return html`
			<div class="blanket" @click=${this.#toggleDropDown}></div>
			<div class="drop-down" part="drop-down">
				<button part="report">
					${infoSquareSvg}
					Report user
				</button>
				<button part="suspend">
					${dangerSvg}
					Suspend user
				</button>
				${deleteButtonIsAvailable
					? html`
						<button part="delete" @click=${archiveThisComment}>
							${binSvg}
							Delete Review
						</button>
					`
					: null}
			</div>
	`}

	render() {
		const user = this.authorId && this.context.commenting.getUser(this.authorId)
		if (!user)
			return null
		return html`
			<div class="outer-div">
				<div class="avatar"></div>
				<div class="inner-div">
					<div class="header">
						<div class="header__txt">
							<p>${user.profile.nickname}</p>
							<span>&bull; ${this.subject}</span>
						</div>
						<div class="header__btn">
							${renderFiveStarRating(this.fiveStarState, this.setFiveStarState)}
							<button @click=${this.#toggleDropDown} class="drop-down__btn">
								&bull;&bull;&bull;
							</button>
						</div>
					</div>
					<p>${this.body}</p>
					<div class="footer">
						<p class="time-stamp">${this.timePosted}</p>
						<span>&bull; 12 comments</span>
						${this.#canPost
							? html`<button @click=${this.#postRandomReply}>Reply</button>`
							: null}
					</div>
				</div>
				<slot name="child-slot">nested comments appear here</slot>
			</div>
			${this.showDropDown ? this.#renderDropDown() : null}
		`
	}
}
