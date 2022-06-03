
import {html, TemplateResult} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"
// import {virtualEditPostModal} from "../../../virtual/virtual-edit-post-modal.js"
import { CommentEditingOptions, virtualEditPostModal } from "../../../virtual/virtual-write-any-comment.js"

// export async function editPostModalView({
// 		modals,
// 		comment,
// 		scoreAspects,
// 	}: {
// 		modals: ModalControls
// 		comment: NestedComment
// 		scoreAspects: string[]
// 	}) {

// 	return new Promise<undefined | object>((resolve) => {
// 		const EditPostModalView = virtualEditPostModal.attach(
// 			{
// 				component: modals.component,
// 			},
// 			{
// 				comment,
// 				scoreAspects,
// 				modals,
// 				onSave: (commenDetails: object) => console.log(commenDetails)
// 			},
// 		)

// 		modals.openModal({
// 			onClose: () => resolve(undefined),
// 			renderContent: ({closeModal}) => html`
// 				<div class="modalview deletepost">
// 					${EditPostModalView({closeModal})}
// 				</div>
// 			`,
// 		})
// 	})
// }


export async function editPostModalView({
	modals,
	comment,
	scoreAspects,
}: {
	modals: ModalControls
	comment: NestedComment
	scoreAspects: string[]
}) {

return new Promise<undefined | object>((resolve) => {
	const EditPostModalView = virtualEditPostModal.attach(
		{
			component: modals.component,
		},
		{
			existingComment: comment,
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
