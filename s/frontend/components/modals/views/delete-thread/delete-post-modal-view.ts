
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"

export async function deletePostModalView({
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
			? "review"
			: "thread"
		: "reply"

	const result = await modals.confirm({
		closeOnBlanketClick: true,
		renderYes: () => html`Delete`,
		renderNo: () => html`Cancel`,
		renderContent: () => html`
		<div class="modalview deletepost">
		<slot name=delete-post-lol-custom>Default Custom Text</slot>
			<h2>Delete ${deleteText}</h2>
			<p>Are you sure you want to delete this ${deleteText} for <strong>"${comment.user.profile.nickname}"</strong></p>
			<p>${deleteText} id: "${comment.id}"</p>
			<p>${deleteText} body: "${comment.body}"</p>
		</div>
		`
	})
	return result
}
