
import {html, TemplateResult} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"
import {validateCommentBody} from "../../../../../api/services/validators/validators.js"
import {virtualFiveStar} from "../../../virtual/virtual-five-star.js"
import {virtualEditPostModal} from "../../../virtual/virtual-edit-post-modal.js"

const defaultScore = 0

export async function editPostModalView({
		modals,
		comment,
		scoreAspects,
	}: {
		modals: ModalControls
		comment: NestedComment
		scoreAspects: string[]
	}) {

	const EditPostModal = virtualEditPostModal.attach({
		component: modals.component,
		state: {choice: "one"},
	})

	return new Promise((resolve) => {
		modals.openModal({
			closeOnBlanketClick: false,
			renderContent: ({closeModal}) => html`
				<div class="modalview deletepost">
					${EditPostModal({modals, closeModal, comment, scoreAspects})}
				</div>
			`,
			onClose: () => resolve(EditPostModal.state.choice)
		})
	})
}
