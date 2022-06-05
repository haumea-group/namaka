import { html } from "lit";
import { virtualBanUserModal } from "../../../virtual/virtual-ban-user-modal.js";
export async function banUserModalView({ modals, comment, }) {
    return new Promise((resolve) => {
        const BanUserModal = virtualBanUserModal.attach({
            component: modals.component,
        }, {
            comment,
            onDelete: (banPeriod) => resolve(banPeriod)
        });
        modals.openModal({
            onClose: () => resolve(undefined),
            renderContent: ({ closeModal }) => html `
				<div class="modalview banuser">
					${BanUserModal({ closeModal })}
				</div>
			`,
        });
    });
}
//# sourceMappingURL=ban-user-modal-view.js.map