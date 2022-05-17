
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import {FiveStarState, renderFiveStarRating} from "../../common/five-stars/render-five-star-display.js"

import NamakaEditCommentCss from "./index.css.js"
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js"
import renderFiveStarDisplayCss from "../../common/five-stars/render-five-star-display.css.js"

@mixinStyles(NamakaEditCommentCss, renderFiveStarDisplayCss)
export class NamakaEditComment extends LitElement {
	@property()
	private fiveStarState: FiveStarState = {
			rating: 0,
	}

	private setFiveStarState = (state: FiveStarState) => {
			this.fiveStarState = state
	}

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
						${renderFiveStarRating(this.fiveStarState, this.setFiveStarState)}
					</div>
					<div class="edit-feedback">
						<p><span part="bold">Edit your feedback to this user</span> <span class="gray">(This will be made public)</span></p>
						<namaka-textarea></namaka-textarea>
						<!-- <textarea name="message" id="message" rows="10"></textarea> -->
					</div>
					<button part="pryColor">Submit</button>
				</div>
			</div>
		`
	}
}
