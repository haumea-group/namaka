
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"
import {DeletionChoice, virtualDeletePostModal} from "../../../virtual/virtual-delete-post-modal.js"

export async function deletePostModalView({
		modals,
		comment,
		userCanArchiveAnyComment,
	}: {
		modals: ModalControls
		comment: NestedComment
		userCanArchiveAnyComment: boolean
	}) {

	return new Promise<undefined | DeletionChoice>((resolve) => {

		const DeletePostModal = virtualDeletePostModal.attach(
			{
				component: modals.component,
			},
			{
				comment,
				userCanArchiveAnyComment,
				onDelete: (choice: DeletionChoice) => resolve(choice),
			},
		)

		modals.openModal({
			onClose: () => resolve(undefined),
			renderContent: ({closeModal}) => html`
				<div class="modalview deletepost">
					${DeletePostModal({closeModal})}
				</div>
			`,
		})
	})
}
