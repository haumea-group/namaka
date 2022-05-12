import {html, LitElement} from "lit"
import infoSvg from "../../../../icons/feather-Icons/info.svg.js"
import closeIconSvg from "../../../../icons/iconify/close-icon.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaDeleteUserCss from "./namaka-delete-user.css.js"

@mixinStyles(namakaDeleteUserCss)
export class NamakaDeleteUser extends LitElement {
	render() {
		return html`
			<div class="delete-user" part='container'>
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${infoSvg}</div>
							<h1 class="title" part="title">Delete User</h1>
						</div>
						<div class="close">${closeIconSvg}</div>
					</div>
					<p class="gray">Are you sure you want to delete <span class="name" part="bold">Francesca20</span> from the platform?</p>
				</div>

				<div class="action">
					<button part="dangerBtn button">
						Delete
					</button>
					<button part="cancelBtn button">
						Cancel
					</button>
				</div>
			</div>
        `
    }
}
