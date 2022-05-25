
import {html} from "lit"
import {virtual} from "../../framework/virtual.js"

import {NestedComment} from "../../models/commenting/commenting-types.js"

import infoCircleSvg from "../../../icons/tabler/info-circle.svg.js"
import deletePostModalViewCss from "../modals/views/delete-thread/delete-post-modal-view.css.js"

export const virtualDeletePostModal = virtual({

	initialState: {
		choice: "one",
		disabledBtn: true,
	},

	setup: (
		{getState, setState}) => {

		const setChoice = (event: Event) => {
			const input = event.target as HTMLInputElement
			setState({
				choice: input.value,
				disabledBtn: false
			})
		}

		const handleCancelClick = () => {
			setState({...getState(), choice: ""})
			close()
		}

		return (
			state,
			props: {
				close: () => void,
				comment: NestedComment,
				userCanArchiveAnyComment:boolean
			}) => {
				const {close, comment, userCanArchiveAnyComment} = props
				const isThread = comment.parentCommentId === undefined
				const isReview = comment.scoring !== undefined

				const deleteText = isThread
					? isReview
						? "review"
						: "thread"
					: "reply"

				const replyCount = comment.children.length
				const userName = comment.user.profile.nickname

				return html`
					<div class="header">
						${infoCircleSvg}
						<h2>Delete ${deleteText}</h2>
					</div>
					<div class="body">
						<h3>
							${userCanArchiveAnyComment ? userName : "You"} said:
						</h3>
						<blockquote>${comment.body}</blockquote>
						${replyCount > 0
								? html`<p class="sub-txt">...and ${replyCount} ${replyCount > 1
									? "replies" : "reply"}</p>`
								: null
							}
					</div>
					${userCanArchiveAnyComment
							? html`
								<div class="selection">
									<label for="del-one">
										<input
											type="radio"
											name="delete"
											id="del-one"
											value="one"
											@change=${setChoice}
										>
										Delete single ${deleteText}
									</label>
									
									<label for="del-all">
										<input
											type="radio"
											name="delete"
											id="del-all"
											value="all"
											@change=${setChoice}
											?disabled=${replyCount < 1}
										>
										Delete ${deleteText} and ${replyCount} replies
									</label>
								</div>
								`
							: null
						}
					<div class="buttons">
						<button ?disabled=${state.disabledBtn} @click=${close}>
							Delete ${state.choice === "all"
								? `${replyCount+1} posts`
								: "post"}
						</button>
						<button
							@click=${() => {
								handleCancelClick()
								close()
							}}
						>Cancel</button>
					</div>
				`
		}
	},

	styles: deletePostModalViewCss
})
