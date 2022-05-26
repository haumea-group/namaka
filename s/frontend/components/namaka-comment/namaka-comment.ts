
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {ModalControls} from "../modals/modal-types.js"
import {makeAuthModel} from "../../models/auth/auth-model.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {NestedComment} from "../../models/commenting/commenting-types.js"
import {randomComment, randomSubject} from "../../../toolbox/randomly.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"

import namakaCommentCss from "./namaka-comment.css.js"
import trash2Svg from "../../../icons/feather/trash2.svg.js"
import infoSquareSvg from "../../../icons/tabler/info-square.svg.js"
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js"
import edit2Svg from "../../../icons/feather/edit-2.svg.js"

import {virtualFiveStar} from "../virtual/virtual-five-star.js"
import {reportUserModalView} from "../modals/views/report-user/report-user-modal-view.js"
import {deletePostModalView} from "../modals/views/delete-post/delete-post-modal-view.js"
import {virtualDeletePostModal} from "../virtual/virtual-delete-post-modal.js"

@mixinStyles(namakaCommentCss, virtualFiveStar.styles)
export class NamakaComment extends mixinStandard<{
		modals: ModalControls
		auth: ReturnType<typeof makeAuthModel>
		commenting: ReturnType<typeof makeCommentingModel>
	}>()(LitElement) {

	private FiveStar = virtualFiveStar.attach({component: this})

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

	async firstUpdated() {
		const comment = this.#getComment()

		this.FiveStar.setState({
			rating: comment.scoring
				? comment.scoring.average
				: 0,
			editable: false,
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
	
	#archiveThisComment = async() => {
		const comment = this.#getComment()
		return this.context.commenting.archiveComment(comment.id)
	}

	#promptReportModal = () => {
		const {modals} = this.context
		const comment = this.#getComment()
		this.#toggleDropDown()
		reportUserModalView({modals, comment})
	}


	#promptDeleteModal = async () => {
		const {modals} = this.context
		const {user} = this.context.auth
		const userCanArchiveAnyComment
			= !!user?.permissions.canArchiveAnyComment
		const comment = this.#getComment()
		this.#toggleDropDown()
		const result = await deletePostModalView({modals, comment, userCanArchiveAnyComment})
		if (result)
			await this.#archiveThisComment()
	}

	#promptEditModal = async () => {
		const {modals} = this.context
		const comment = this.#getComment()
		this.#toggleDropDown()
	}

	#renderDropDown = () => {
		const comment = this.#getComment()
		const {user} = this.context.auth

		const isUserLoggedIn = !!user
		const userCanArchiveAnyComment
			= !!user?.permissions.canArchiveAnyComment
		
		const userCanEditAnyComment
			= !!user?.permissions.canEditAnyComment

		const userIsTheAuthorOfThisComment = isUserLoggedIn
			&& user?.id === comment.user.id

		const deleteButtonIsAvailable = userCanArchiveAnyComment
			|| userIsTheAuthorOfThisComment
		
		const editButtonIsAvailable = userCanEditAnyComment
		|| userIsTheAuthorOfThisComment

		const isThread = comment.parentCommentId === undefined
		const isReview = comment.scoring !== undefined

		const deleteText = isThread
			? isReview
				? "Delete review"
				: "Delete thread"
			: "Delete reply"
		
		const editText = isThread
			? isReview
				? "Edit review"
				: "Edit thread"
			: "Edit reply"

		return html`
			<div class="blanket" @click=${this.#toggleDropDown}></div>
			<div class="drop-down" part="drop-down">
				<button
					part="report"
					@click=${this.#promptReportModal}>
						${infoSquareSvg}
						Report user
				</button>
				<button part="suspend">
					${alertTriangleSvg}
					Suspend user
				</button>
				${deleteButtonIsAvailable
					? html`
						<button part="delete" @click=${this.#promptDeleteModal}>
							${trash2Svg}
							${deleteText}
						</button>
					`
					: null}
				${editButtonIsAvailable
					? html`
						<button part="edit" @click=${this.#promptEditModal}>
							${edit2Svg}
							${editText}
						</button>
					`
					: null}
			</div>
	`}

	render() {
		const {FiveStar} = this
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
								? FiveStar()
								: null}
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
