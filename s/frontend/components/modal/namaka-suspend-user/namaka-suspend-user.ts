import {html, LitElement} from "lit"
import closeIconSvg from "../../../../icons/iconify/close-icon.svg.js"
import suspendSvg from "../../../../icons/iconify/suspend.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaSuspendUserCss from "./namaka-suspend-user.css.js"

@mixinStyles(namakaSuspendUserCss)
export class NamakaSuspendUser extends LitElement {
	render() {
		return html`
			<div class="suspend-user" part='container'>
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${suspendSvg}</div>
							<h1 class="title" part="title">Suspend User</h1>
						</div>
						<div class="close">${closeIconSvg}</div>
					</div>
					<p class="gray">Are you sure you want to suspend <span class="name">Francesca20</span> from the platform?</p>
				</div>

				<div class="selection">
					<div>
						<input type="radio" name="24hrs" />
						<label for="24hrs" part="label">24 hrs</label>
					</div>
					<div>
						<input type="radio" name="7days" />
						<label for="7days" part="label">7  days</label>
					</div>
					<div>
						<input type="radio" name="indefinitely" />
						<label for="indefinitely" part="label">Indefinitely</label>
					</div>
				</div>

				<div class="action">
					<button part="dangerBtn button">
						Suspend
					</button>
					<button part="cancelBtn button">
						Cancel
					</button>
				</div>
			</div>
        `
    }
}
