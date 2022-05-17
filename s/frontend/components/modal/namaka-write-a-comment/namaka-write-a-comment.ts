import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import {FiveStarState, renderFiveStarRating} from "../../common/five-stars/render-five-star-display.js"

import xCircleSvg from "../../../../icons/feather/x-circle.svg.js"
import namakaWriteACommentCss from "./namaka-write-a-comment.css.js"
import renderFiveStarDisplayCss from "../../common/five-stars/render-five-star-display.css.js"

@mixinStyles(namakaWriteACommentCss, renderFiveStarDisplayCss)
export class NamakaWriteAComment extends LitElement {

	@property()
	private fiveStarState: FiveStarState = {
		rating: 0,
	}

	private setFiveStarState = (state: FiveStarState) => {
		this.fiveStarState = state
	}

	render() {
		return html`
			<div class="add-review" part="container">
				<div class="box1">
					<div class="heading">
						<span part="title" part="title">Leave a Review</span>
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
						<p><span part="bold">Leave a feedback to this user</span> <span class="gray">(This will be made public)</span></p>
						<namaka-text-input></namaka-text-input	xt-input>
						<!-- <textarea name="message" id="message" rows="10"></textarea> -->
					</div>
					<button part="pryColor">Submit</button>
				</div>
			</div>
        `
    }
}
