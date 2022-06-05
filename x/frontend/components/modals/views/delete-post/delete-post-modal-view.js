import { html } from "lit";
import { virtualDeletePostModal } from "../../../virtual/virtual-delete-post-modal.js";
export async function deletePostModalView({ modals, comment, userCanArchiveAnyComment, }) {
    return new Promise((resolve) => {
        const DeletePostModal = virtualDeletePostModal.attach({
            component: modals.component,
        }, {
            comment,
            userCanArchiveAnyComment,
            onDelete: (choice) => resolve(choice),
        });
        modals.openModal({
            onClose: () => resolve(undefined),
            renderContent: ({ closeModal }) => html `
				<div class="modalview deletepost">
					${DeletePostModal({ closeModal })}
				</div>
			`,
        });
    });
}
//# sourceMappingURL=delete-post-modal-view.js.map