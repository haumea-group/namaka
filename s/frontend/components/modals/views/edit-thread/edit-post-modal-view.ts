
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"
import {validateCommentBody} from "../../../../../api/services/validators/validators.js"

export async function editPostModalView({
		modals,
		comment
	}: {
		modals: ModalControls
		comment: NestedComment
	}) {

	const isThread = comment.parentCommentId === undefined
	const isReview = comment.scoring !== undefined

	const editText = isThread
		? isReview
			? "review"
			: "thread"
		: "reply"

	const result = await modals.confirm({
		closeOnBlanketClick: true,
		renderYes: () => html`Save`,
		renderNo: () => html`Cancel`,
		renderContent: () => html`
		<div class="modalview deletepost">
			<h2>Edit ${editText}</h2>
			<namaka-textarea
				.validator=${validateCommentBody}
				.initial-value="${comment.body}"
				part="textarea"
			></namaka-textarea>
		</div>
		`
	})
	return result
}
