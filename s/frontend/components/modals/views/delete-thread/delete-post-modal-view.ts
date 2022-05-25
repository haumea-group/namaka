
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"
import {virtualDeletePostModal} from "../../../virtual/virtual-delete-post-modal.js"

export async function deletePostModalView({
		modals,
		comment,
		userCanArchiveAnyComment,
	}: {
		modals: ModalControls
		comment: NestedComment
		userCanArchiveAnyComment: boolean
	}) {

	const DeletePostModal = virtualDeletePostModal.attach({
		component: modals.component,
		state: {choice: "one", disabledBtn :userCanArchiveAnyComment},
	})

	return new Promise((resolve) => {
		modals.popup({
			closeOnBlanketClick: true,
			renderPopup: ({close}) => html`
				<div class="modalview deletepost">
					${DeletePostModal({close, comment, userCanArchiveAnyComment})}
				</div>
			`,
			onClose: () => resolve(DeletePostModal.state.choice)
		})
	})
	
}
