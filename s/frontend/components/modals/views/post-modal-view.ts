import {html} from "lit"
import {NestedComment} from "../../../models/commenting/commenting-types.js"
import {virtualEditPostModal} from "../../virtual/virtual-write-any-comment.js"
import {ModalControls} from "../modal-types.js"

export async function postModalView({
	modals,
	isAReview,
	scoreAspects,
}: {
	modals: ModalControls
	isAReview: boolean
	scoreAspects: string[]
}) {

return new Promise<undefined | object>((resolve) => {
	const EditPostModalView = virtualEditPostModal.attach(
		{
			component: modals.component,
		},
		{
			parentCommentId: undefined,
			isAReview,
			scoreAspects,
			modals,
			onSave: (commenDetails: object) => console.log(commenDetails)
		},
	)

	modals.openModal({
		onClose: () => resolve(undefined),
		renderContent: ({closeModal}) => html`
			<div class="modalview deletepost">
				${EditPostModalView({closeModal})}
			</div>
		`,
	})
})
}
