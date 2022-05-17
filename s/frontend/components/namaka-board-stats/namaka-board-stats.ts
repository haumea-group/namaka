
import {html, LitElement} from "lit"
import namakaBoardStatsCss from "./namaka-board-stats.css.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"

@mixinStyles(namakaBoardStatsCss)
export class NamakaBoardStats extends LitElement {
	render() {
		return html`
			<div class="review-summary" part="container">
				<!-- <namaka-my-review></namaka-my-review> -->
				<div class="flex-container">
					<div class="wrapper">
						<div>
							<span class="big">4.6</span>
							<span class="small">/5</span>
						</div>

						<p>Based on 1,321 reviews</p>
					</div>

					<namaka-horizontal-review></namaka-horizontal-review>
				</div>
			</div>
		`
	}
}
