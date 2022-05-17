
import {html, LitElement} from "lit"

import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"

import NamakaBanCss from "./namaka-ban.css.js"
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js"
import alertTriangleSvg from "../../../../icons/feather/alert-triangle.svg.js"
@mixinStyles(NamakaBanCss)
export class NamakaBan extends LitElement {
	render() {
		return html`
			<div class="suspend-user" part='container'>
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${alertTriangleSvg}</div>
							<h1 class="title" part="title">
								<slot name="title">Title</slot>	
							</h1>
						</div>
						<div>${xCircleSvg}</div>
					</div>
					<p class="gray">
						<slot name="text">You can edit this text</slot>	
					</p>
				</div>

				<form class="selection">
					<div>
						<input type="radio" name="time" value="24hrs" />
						<label for="24hrs" part="label">24 hrs</label>
					</div>
					<div>
						<input type="radio" name="time" value="7days" />
						<label for="7days" part="label">7  days</label>
					</div>
					<div>
						<input type="radio" name="time" value="indefinitely" />
						<label for="indefinitely" part="label">Indefinitely</label>
					</div>
				</form>

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
