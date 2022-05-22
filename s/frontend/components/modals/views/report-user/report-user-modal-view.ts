
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"

export function reportUserModalView({
		modals,
		comment,
	}: {
		modals: ModalControls
		comment: NestedComment
	}) {

	modals.popup({
		closeOnBlanketClick: true,
		renderPopup: ({close}) => html`
			<div class="modalview report">
				<slot name=report-user-lol-custom>Default Custom Text</slot>
				<h2>report user!?</h2>
				<p>username: "${comment.user.profile.nickname}"</p>
				<p>user id: "${comment.user.id}"</p>
				<p>comment id: "${comment.id}"</p>
				<button @click=${close}>close</button>
			</div>
		`,
	})
}
