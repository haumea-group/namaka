import { html } from "lit";
import { virtual } from "../../framework/virtual.js";
import xCircleSvg from "../../../icons/feather/x-circle.svg.js";
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js";
import banUserModalViewCss from "../modals/views/ban-user/ban-user-modal-view.css.js";
export var BanPeriod;
(function (BanPeriod) {
    BanPeriod[BanPeriod["OneDay"] = 0] = "OneDay";
    BanPeriod[BanPeriod["SevenDays"] = 1] = "SevenDays";
    BanPeriod[BanPeriod["Indefinitely"] = 2] = "Indefinitely";
})(BanPeriod || (BanPeriod = {}));
export const virtualBanUserModal = virtual({
    initialState: {
        banPeriod: BanPeriod.OneDay
    },
    setup: ({ setState }, { comment, onDelete }) => {
        const setChoice = (event) => {
            const input = event.target;
            setState({
                banPeriod: input.value === "indefinitely"
                    ? BanPeriod.Indefinitely
                    : input.value === "7days"
                        ? BanPeriod.SevenDays
                        : BanPeriod.OneDay
            });
        };
        return (state, props) => {
            const { closeModal } = props;
            function handleDeleteClick() {
                onDelete(state.banPeriod);
                closeModal();
            }
            return html `
				<div class="suspend-user" part='container'>
					<div class="border-b">
						<div class="heading">
							<div class="heading__text">
								<div class="info">${alertTriangleSvg}</div>
								<h1 class="title" part="title">
									<slot name="title">Suspend User</slot>	
								</h1>
							</div>
							<div @click=${closeModal}>${xCircleSvg}</div>
						</div>
						<p class="gray">
							<slot name="text">Are you sure you want to suspend ${comment.user.profile.nickname} from the platform?</slot>	
						</p>
					</div>
	
					<form class="selection">
						<div>
							<input
								type="radio"
								name="time"
								value="24hrs"
								checked
								@click=${setChoice}
							/>
							<label for="24hrs" part="label">24 hrs</label>
						</div>
						<div>
							<input
								type="radio"
								name="time"
								value="7days"
								@click=${setChoice}
							/>
							<label for="7days" part="label">7  days</label>
						</div>
						<div>
							<input
								type="radio"
								name="time"
								value="indefinitely"
								@click=${setChoice}
							/>
							<label for="indefinitely" part="label">Indefinitely</label>
						</div>
					</form>
	
					<div class="action">
						<button
							part="dangerBtn button"
							@click=${handleDeleteClick}>
							Suspend
						</button>
						<button 
							part="cancelBtn button"
							@click=${closeModal}>
							Cancel
						</button>
					</div>
				</div>
			`;
        };
    },
    styles: banUserModalViewCss
});
//# sourceMappingURL=virtual-ban-user-modal.js.map