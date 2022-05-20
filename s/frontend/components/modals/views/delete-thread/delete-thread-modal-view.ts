
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"

export async function deleteThreadModalView({
		modals,
		comment,
	}: {
		modals: ModalControls
		comment: NestedComment
	}) {

		const isThread = comment.parentCommentId === undefined
		const isReview = comment.scoring !== undefined

		const deleteText = isThread
			? isReview
				? "Delete review"
				: "Delete thread"
			: "Delete reply"

		const result = await modals.confirm({
			closeOnBlanketClick: true,
			renderYes: () => html`Delete`,
			renderNo: () => html`Cancel`,
			renderContent: () => html`
			<div class="modalview report">
				<h2>${deleteText}</h2>
				<p>Are you sure you want to delete this review for "${comment.user.profile.nickname}"</p>
				<p>${deleteText.split(" ").at(-1)} id: "${comment.id}"</p>
				<p>${deleteText.split(" ").at(-1)} body: "${comment.body}"</p>
			</div>
			`
		})
		return result
}
