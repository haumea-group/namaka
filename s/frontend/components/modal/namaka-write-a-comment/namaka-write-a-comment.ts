import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"

import xCircleSvg from "../../../../icons/feather/x-circle.svg.js"
import namakaWriteACommentCss from "./namaka-write-a-comment.css.js"
import {virtualFiveStar} from "../../virtual/virtual-five-star.js"

@mixinStyles(namakaWriteACommentCss, virtualFiveStar.styles)
export class NamakaWriteAComment extends LitElement {

	private FiveStar = virtualFiveStar.attach({
		component: this,
		state: {
			rating: 50,
			editable: true,
		},
	},
	{onRatingChange: (rating) => console.log(rating)})

	render() {
		const {FiveStar} = this
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
						${FiveStar()}
					</div>
					<div class="edit-feedback">
						<p><span part="bold">Leave a feedback to this user</span> <span class="gray">(This will be made public)</span></p>
						<namaka-textarea></namaka-textarea>
					</div>
					<button part="primaryColor">Submit</button>
				</div>
			</div>
		`
	}
}
