
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {makeAuthModel} from "../../models/auth/auth-model.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {randomComment, randomSubject} from "../../../toolbox/randomly.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"
import {FiveStarState, renderFiveStarRating} from "../common/five-stars/render-five-star-display.js"

import trash2Svg from "../../../icons/feather/trash2.svg.js"
import infoSquareSvg from "../../../icons/tabler/info-square.svg.js"
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js"

import namakaReviewCommentCss from "./namaka-review-comment.css.js"
import renderFiveStarDisplayCss from "../common/five-stars/render-five-star-display.css.js"
import {NestedComment} from "../../models/commenting/commenting-types.js"

@mixinStyles(namakaReviewCommentCss, renderFiveStarDisplayCss)
export class NamakaReviewComment extends mixinStandard<{
		auth: ReturnType<typeof makeAuthModel>
		commenting: ReturnType<typeof makeCommentingModel>
	}>()(LitElement) {

	@property({type: Object})
	comment?: NestedComment = undefined

	#getComment() {
		if (!this.comment)
			throw new Error("comment property is required, but not set")
		return this.comment
	}

	@property()
	private showDropDown: boolean = false

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
		const comment = this.#getComment()
		this.setFiveStarState({
			rating: comment.scoring
				? comment.scoring.average
				: 0,
		})
	}

	#postRandomReply = async() => {
		if (this.#canPost) {
			const {id, topicId} = this.#getComment()
			await this.context.commenting.postComment({
				topicId: topicId,
				parentCommentId: id,
				subject: randomSubject(),
				body: [randomComment(), randomComment(), randomComment()].join(" "),
			})
		}
	}

	#toggleDropDown = () => {
		this.showDropDown = !this.showDropDown
	}

	#renderDropDown = () => {
		const comment = this.#getComment()
		const {user} = this.context.auth

		const isUserLoggedIn = !!user
		const userCanArchiveAnyComment
			= !!user?.permissions.canArchiveAnyComment

		const userIsTheAuthorOfThisComment = isUserLoggedIn
			&& user?.id === comment.user.id

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
					${alertTriangleSvg}
					Suspend user
				</button>
				${deleteButtonIsAvailable
					? html`
						<button part="delete" @click=${archiveThisComment}>
							${trash2Svg}
							Delete Review
						</button>
					`
					: null}
			</div>
	`}

	render() {
		const comment = this.#getComment()
		if (!comment.user)
			return null
		return html`
			<div class="outer-div">
				<div class="avatar"></div>
				<div class="inner-div">
					<div class="header">
						<div class="header__txt">
							<p>${comment.user.profile.nickname}</p>
							<span>&bull; ${comment.subject}</span>
						</div>
						<div class="header__btn">
							${comment.scoring
								? renderFiveStarRating(this.fiveStarState, this.setFiveStarState)
								: undefined}
							<button @click=${this.#toggleDropDown} class="drop-down__btn">
								&bull;&bull;&bull;
							</button>
						</div>
					</div>
					<p>${comment.body}</p>
					<div class="footer">
						<p class="time-stamp">${comment.timePosted}</p>
						<span>&bull; ${comment.children.length} ${comment.children.length === 1 ? "comment" : "comments"}</span>
						${this.#canPost
							? html`<button @click=${this.#postRandomReply}>Reply</button>`
							: null}
					</div>
				</div>
			</div>
			<div class="nested-reply" part="nested-reply">
				<slot></slot>
			</div>
			${this.showDropDown ? this.#renderDropDown() : null}
		`
	}
}
