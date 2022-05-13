import {html, LitElement} from "lit"
import closeIconSvg from "../../../../icons/material-design/close-icon.svg.js"
import starSvg from "../../../../icons/tabler/star.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaAddReviewCss from "./namaka-add-review.css.js"

@mixinStyles(namakaAddReviewCss)
export class NamakaAddReview extends LitElement {
	render() {
		return html`
			<div class="add-review" part="container">
				<div class="box1">
					<div class="heading">
						<span part="title" part="title">Leave a Review</span>
						<div class="close">${closeIconSvg}</div>
					</div>
					<p class="gray">Share your experience with the ValorExchange community, to help make better decisions</p>
				</div>
				<div class="share">
					<div class="group">
						<div>
							<p part="subtitle">Share Review?</p>
							<p class="gray">Please choose a review to rate this particular user.</p>
						</div>
						<div class="flex">
							${starSvg}
							${starSvg}
							${starSvg}
							${starSvg}
							${starSvg}
						</div>
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
