
import {html, LitElement} from "lit"

import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"

import NamakaEditCommentCss from "./index.css.js"
import {FiveStar} from "../../virtual/virtual-five-star.js"
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js"

@mixinStyles(NamakaEditCommentCss, FiveStar.css)
export class NamakaEditComment extends LitElement {

	render() {
		return html`
			<div class="edit-review" part="container">
				<div class="box1">
					<div class="heading">
						<span part="title" part="title">Edit Review</span>
						<div>${xCircleSvg}</div>
					</div>
					<p class="gray">Share your experience with the ValorExchange community, to help make better decisions</p>
				</div>
				<div class="share">
					<div class="group">
						<div>
							<p part="subtitle">Share Review?</p>
							<p class="gray">Please choose a review to rate this particular user.</p>
						</div>
						${FiveStar({editable: true, initialScore: 100})}
					</div>
					<div class="edit-feedback">
						<p><span part="bold">Edit your feedback to this user</span> <span class="gray">(This will be made public)</span></p>
						<namaka-textarea></namaka-textarea>
						<!-- <textarea name="message" id="message" rows="10"></textarea> -->
					</div>
					<button part="primaryColor">Submit</button>
				</div>
			</div>
		`
	}
}
