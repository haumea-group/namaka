
import {html} from "lit"
import {virtual} from "../../framework/virtual.js"

import {NestedComment} from "../../models/commenting/commenting-types.js"

import infoCircleSvg from "../../../icons/tabler/info-circle.svg.js"
import deletePostModalViewCss from "../modals/views/delete-post/delete-post-modal-view.css.js"

export enum DeletionChoice {
	DeleteSingleComment,
	DeleteEntireCommentTree,
}

export const virtualDeletePostModal = virtual({

	initialState: {
		choice: DeletionChoice.DeleteSingleComment,
		isDeleteButtonDisabled: true,
	},

	setup: ({getState, setState}, {
			comment, userCanArchiveAnyComment, onDelete,
		}: {
			comment: NestedComment
			userCanArchiveAnyComment: boolean
			onDelete: (choice: DeletionChoice) => void
		}) => {

		const userName = comment.user.profile.nickname
		const isThread = comment.parentCommentId === undefined
		const isReview = comment.scoring !== undefined
		const replyCount = comment.children.length
		const isMultipleChoice = userCanArchiveAnyComment && replyCount > 0

		setState({
			...getState(),
			isDeleteButtonDisabled: isMultipleChoice,
		})

		const deleteText = isThread
			? isReview
				? "review"
				: "thread"
			: "reply"

		const setChoice = (event: Event) => {
			const input = event.target as HTMLInputElement
			setState({
				choice: input.value === "one"
					? DeletionChoice.DeleteSingleComment
					: DeletionChoice.DeleteEntireCommentTree,
				isDeleteButtonDisabled: false,
			})
		}

		return (state, props: {closeModal: () => void}) => {
			const {closeModal} = props

			function handleDeleteClick() {
				onDelete(state.choice)
				closeModal()
			}

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
					${isMultipleChoice
							? html`
								<p class="sub-txt">
									...and ${replyCount} ${replyCount > 1 ? "replies" : "reply"}
								</p>
							`
							: null
						}
				</div>
				${isMultipleChoice
					? html`
						<div class="selection">
							<label for="del-one">
								<input
									type="radio"
									name="delete"
									id="del-one"
									value="one"
									@change=${setChoice}/>
								Delete single ${deleteText}
							</label>
							
							<label for="del-all">
								<input
									type="radio"
									name="delete"
									id="del-all"
									value="all"
									@change=${setChoice}/>
								Delete ${deleteText} and ${replyCount} replies
							</label>
						</div>
						`
					: null}
				<div class="buttons">
					<button
						?disabled=${state.isDeleteButtonDisabled}
						@click=${handleDeleteClick}>
							Delete ${state.choice === DeletionChoice.DeleteEntireCommentTree
								? `${replyCount+1} posts`
								: "post"}
					</button>
					<button @click=${closeModal}>Cancel</button>
				</div>
			`
		}
	},

	styles: deletePostModalViewCss
})
