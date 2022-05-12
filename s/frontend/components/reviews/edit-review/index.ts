
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import {FiveStarState, renderFiveStarRating} from "../../common/five-stars/render-five-star-display.js"

import starSvg from "../../../../icons/tabler/star.svg.js"
import closeIconSvg from "../../../../icons/material-design/close-icon.svg.js"

import namakaEditReviewCss from "./index.css.js"
import renderFiveStarDisplayCss from "../../common/five-stars/render-five-star-display.css.js"

@mixinStyles(namakaEditReviewCss, renderFiveStarDisplayCss)
export class NamakaEditReview extends LitElement {
	@property()
	private fiveStarState: FiveStarState = {
			rating: 0,
	}

	private setFiveStarState = (state: FiveStarState) => {
			this.fiveStarState = state
	}

	render() {
		return html`
			<div class="edit-review">
				<div class="box1">
					<div class="heading">
						<span class="title">Edit Review</span>
						<div class="close">${closeIconSvg}</div>
					</div>
					<p class="gray">Share your experience with the ValorExchange community, to help make better decisions</p>
				</div>
				<div class="share">
					<div class="group">
						<div>
							<p>Share Review?</p>
							<p class="gray">Please choose a review to rate this particular user.</p>
						</div>
						<!-- <div class="flex">
							${starSvg}
							${starSvg}
							${starSvg}
							${starSvg}
							${starSvg}
						</div> -->
						${renderFiveStarRating(this.fiveStarState, this.setFiveStarState)}
					</div>
					<div class="edit-feedback">
						<p><span class="black">Edit your feedback to this user</span> <span class="gray">(This will be made public)</span></p>
						<textarea name="message" id="message" rows="10"></textarea>
					</div>
					<button>Submit</button>
				</div>
			</div>
		`
	}
}
