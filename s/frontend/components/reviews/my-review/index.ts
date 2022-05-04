import { html, LitElement } from "lit"
import ratingsSvg from "../../../../icons/iconify/ratings.svg.js"
import starSvg from "../../../../icons/iconify/star.svg.js"
import tickSquareSvg from "../../../../icons/iconify/tick-square.svg.js"
import timeCircleSvg from "../../../../icons/iconify/time-circle.svg.js"
import { mixinStyles } from "../../../framework/mixins/mixin-styles.js"
// import { mixinStandard } from "../../../framework/mixins/mixin-standard.js"
import namakaMyReviewCss from "./index.css.js"

@mixinStyles(namakaMyReviewCss)
export class NamakaMyReview extends LitElement {
	render() {
		return html`
			<div class="review-summary">
				<div class="group">
					<img src="/assets/profile-img.png" alt="Profile Image" width="55" height="55" />
					<div>
						<p id="name">MrLong007</p>
						<div class="rating flex">
							${starSvg}
							<span id="value">0.00</span>
							<span id="total">(0 reviews)</span>
						</div>
					</div>
				</div>

				<div class="grid">
					<div class="flex">
						${tickSquareSvg}
						<p><span class="gray">Completed:</span>&nbsp<span class="black">0</span></p>
					</div>
					<div class="flex">
						${timeCircleSvg}
						<p><span class="gray">Avg Speed: 0</span><span class="black">mins</span></p>
					</div>
					<div class="flex">
						${ratingsSvg}
						<p><span class="gray">Ratings:</span>&nbsp<span class="black">0.0</span></p>
					</div>
				</div>
			</div>
		`
	}
}
