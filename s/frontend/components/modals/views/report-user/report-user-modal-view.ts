
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"

import alertTriangleSvg from "../../../../../icons/feather/alert-triangle.svg.js"

export function reportUserModalView({
		modals,
		comment,
	}: {
		modals: ModalControls
		comment: NestedComment
	}) {

	const copyText = `
		Username: ${comment.user.profile.nickname}
		userId: ${comment.user.id}
		commentId: ${comment.id}
	`

	modals.openModal({
		closeOnBlanketClick: true,
		renderContent: ({closeModal}) => html`
			<div part="container" class="modalview report">

				<slot name=report-user-lol-custom>Default Custom Text</slot>

				<h2>${alertTriangleSvg} Report user</h2>
				<p>Please send an email to the following address to submit your report against this user's comment.</p>

				<h2><slot name=support-email>example@example.com</slot></h2>
				<p>Please include the following information in the email, so we can identify which comment and user.</p>

				<namaka-copy-to-clipboard
					copyText=${copyText}
				></namaka-copy-to-clipboard>

				<button class="btn-close" @click=${closeModal}>Done</button>
			</div>
		`,
	})
}
