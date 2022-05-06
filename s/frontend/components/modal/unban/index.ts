import {html, LitElement} from "lit"
import closeIconSvg from "../../../../icons/iconify/close-icon.svg.js"
import infoSvg from "../../../../icons/iconify/info.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaBanUserCss from "./index.css.js"

@mixinStyles(namakaBanUserCss)
export class NamakaBanUser extends LitElement {
	render() {
		return html`
			<div class="ban-user">
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${infoSvg}</div>
							<h1 class="title">Unban User</h1>
						</div>
						<div class="close">${closeIconSvg}</div>
					</div>
					<p class="gray">Are you sure you want to unban <span class="name">Francesca20</span>? This user will be able to use this platform again when unbanned </p>
				</div>

				<div class="action">
					<button class="pry">
						Unban
					</button>
					<button class="light">
						Cancel
					</button>
				</div>
			</div>
        `
    }
}
