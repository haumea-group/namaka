import {html, LitElement} from "lit"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaHorizontalReviewCss from "./index.css.js"

@mixinStyles(namakaHorizontalReviewCss)
export class NamakaHorizontalReview extends LitElement {
	render() {
		return html`
			<div class="horizontal-review">
				<div class="grid">
					<div class="flex">
						<span class="gray">5 star</span>
						<div class="line">
						   <div class="fill"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">4 star</span>
						<div class="line">
						   <div class="fill w-4"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">3 star</span>
						<div class="line">
						   <div class="fill w-3"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">2 star</span>
						<div class="line">
						   <div class="fill w-2"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">1 star</span>
						<div class="line">
						   <div class="fill w-1"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">No star</span>
						<div class="line">
						   <div class="fill w-0"></div>
						</div>
					</div>
				</div>
			</div>
		`
	}
}
