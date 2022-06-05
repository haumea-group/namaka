
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
import edit2Svg from "../../../icons/feather/edit-2.svg.js"
import trash2Svg from "../../../icons/feather/trash2.svg.js"
import infoSquareSvg from "../../../icons/tabler/info-square.svg.js"
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js"

import {obtool} from "../../../toolbox/obtool.js"
import {howLongAgo} from "../../../toolbox/how-long-ago.js"
import {virtualFiveStar} from "../virtual/virtual-five-star.js"
import {banUserModalView} from "../modals/views/ban-user/ban-user-modal-view.js"
import {mixinRefreshInterval} from "../../framework/mixins/mixin-refresh-interval.js"
import {reportUserModalView} from "../modals/views/report-user/report-user-modal-view.js"
import {deletePostModalView} from "../modals/views/delete-post/delete-post-modal-view.js"
import {recursivelyCountAllNestedChildren} from "./utils/recursively-count-all-nested-children.js"

@mixinRefreshInterval(1000)
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
		return this.context.commenting.archiveComments([comment.id])
	}

	get #modalPrompts() {
		const {modals, auth: {user}} = this.context
		const comment = this.#getComment()
		return obtool({

			report: async() => {
				reportUserModalView({modals, comment})
			},

			ban: async() => {
				const banPeriod = await banUserModalView({modals, comment})
				console.log(`ban user ${comment.user.profile.nickname} for ${banPeriod}`)
			},

			delete: async() => {
				const deletionChoice = await deletePostModalView({
					modals,
					comment,
					userCanArchiveAnyComment: !!user?.permissions.canArchiveAnyComment,
				})
				if (deletionChoice !== undefined)
					await this.#archiveThisComment()
			},

			edit: async() => {},

		}).map(fun => async() => {
			this.#toggleDropDown()
			return fun()
		})
	}

	#renderDropDown = () => {
		const comment = this.#getComment()
		const {user} = this.context.auth

		const isUserLoggedIn = !!user
		const {canArchiveAnyComment, canEditAnyComment, canBanUsers}
			= user?.permissions ?? {}

		const isAuthor = isUserLoggedIn
			&& user?.id === comment.user.id

		const buttons = {
			delete: canArchiveAnyComment || isAuthor,
			edit: isAuthor || canEditAnyComment,
			ban: canBanUsers,
		}

		const isThread = comment.parentCommentId === undefined
		const isReview = comment.scoring !== undefined
		const postType = isThread
			? isReview
				? "review"
				: "thread"
			: "reply"

		const prompts = this.#modalPrompts

		return html`
			<div class=blanket @click=${this.#toggleDropDown}></div>
			<div class=dropdownmenu part=dropdownmenu>
				<button
					part=report
					@click=${prompts.report}>
						${infoSquareSvg}
						Report user
				</button>

				${buttons.ban
					? html`
						<button part=suspend @click=${prompts.ban}>
							${alertTriangleSvg}
							Suspend user
						</button>
					`
					: null}

				${buttons.delete
					? html`
						<button part=delete @click=${prompts.delete}>
							${trash2Svg}
							Delete ${postType}
						</button>
					`
					: null}

				${buttons.edit
					? html`
						<button part=edit @click=${prompts.edit}>
							${edit2Svg}
							Edit ${postType}
						</button>
					`
					: null}
			</div>
		`
	}

	render() {
		const {FiveStar} = this
		const comment = this.#getComment()

		if (!comment.user)
			return null

		const replyCount: number = recursivelyCountAllNestedChildren(comment)

		return html`
			<section>
				<namaka-avatar .user=${comment.user}></namaka-avatar>
				<div class=plate>

					<header>
						<span class=nickname>
							${comment.user.profile.nickname}
						</span>
						<span class=fivestar>
							${comment.scoring
								? FiveStar()
								: null}
						</span>
						<button class=dropdownbutton @click=${this.#toggleDropDown}>
							&bull;&bull;&bull;
						</button>
					</header>

					<div class=text>
						<p class=subject>
							${comment.subject}
						</p>
						<p class=body>
							${comment.body}
						</p>
					</div>

					<footer>
						<span class=time>
							${howLongAgo(comment.timePosted)}
						</span>
						${replyCount > 0
							? html`
								<span>—</span>
								<span>
									${replyCount}
									${replyCount === 1 ?"reply" : "replies"}
								</span>
							`
							: null}
						${this.#canPost
							? html`
								<button
									part=button
									class=reply
									@click=${this.#postRandomReply}>
										Reply
								</button>`
							: null}
					</footer>
				</div>
			</section>

			${this.showDropDown
				? this.#renderDropDown()
				: null}

			<slot class=nested-reply></slot>
		`
	}
}
