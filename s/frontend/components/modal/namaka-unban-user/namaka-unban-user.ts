import {html, LitElement} from "lit"
import infoSvg from "../../../../icons/feather-Icons/info.svg.js"
import closeIconSvg from "../../../../icons/iconify/close-icon.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaUnbanUserCss from "./namaka-unban-user.css.js"

@mixinStyles(namakaUnbanUserCss)
export class NamakaUnbanUser extends LitElement {
	render() {
		return html`
			<div class="ban-user" part="container">
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${infoSvg}</div>
							<h1 part="title" part="title">
								<slot name="title">Title</slot>
							</h1>
						</div>
						<div class="close">${closeIconSvg}</div>
					</div>
					<p class="gray">
						<slot name="text">You can edit this text</slot>
					</p>
				</div>

				<div class="action">
					<button part="pryColor button">
						Unban
					</button>
					<button part="cancelBtn button">
						Cancel
					</button>
				</div>
			</div>
        `
    }
}
