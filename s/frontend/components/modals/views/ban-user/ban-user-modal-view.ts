
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {virtualBanUserModal} from "../../../virtual/virtual-ban-user-modal.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"

export async function banUserModalView({
		modals,
		comment,
	}: {
		modals: ModalControls
		comment: NestedComment
	}) {

	const BanUserModal = virtualBanUserModal.attach({
		component: modals.component,
		state: {banPeriod: ""},
	})

	return new Promise((resolve) => {
		modals.openModal({
			closeOnBlanketClick: false,
			renderContent: ({closeModal}) => html`
				<div class="modalview banuser">
					${BanUserModal({closeModal, comment})}
				</div>
			`,
			onClose: () => resolve(BanUserModal.state.banPeriod)
		})
	})
}
