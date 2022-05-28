
import {html} from "lit"
import {ModalControls} from "../../modal-types.js"
import {BanPeriod, virtualBanUserModal} from "../../../virtual/virtual-ban-user-modal.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"

export async function banUserModalView({
		modals,
		comment,
	}: {
		modals: ModalControls
		comment: NestedComment
	}) {

	return new Promise<BanPeriod | undefined> ((resolve) => {

		const BanUserModal = virtualBanUserModal.attach({
			component: modals.component,
		}, {
			comment,
			onDelete: (banPeriod: BanPeriod) => resolve(banPeriod)
		})

		modals.openModal({
			onClose: () => resolve(undefined),
			renderContent: ({closeModal}) => html`
				<div class="modalview banuser">
					${BanUserModal({closeModal})}
				</div>
			`,
		})
	})
}
