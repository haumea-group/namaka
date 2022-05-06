import {html, LitElement} from "lit"
import closeIconSvg from "../../../../icons/iconify/close-icon.svg.js"
import dangerSvg from "../../../../icons/iconify/danger.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaDeleteReviewCss from "./index.css.js"

@mixinStyles(namakaDeleteReviewCss)
export class NamakaDeleteReview extends LitElement {
	render() {
		return html`
			<div class="delete-review">
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${dangerSvg}</div>
							<h1 class="title">Delete User</h1>
						</div>
						<div class="close">${closeIconSvg}</div>
					</div>
					<p class="gray">Are you sure you want to delete this review for <span class="name">Francesca20</span>?</p>
				</div>

				<div class="action">
					<button class="danger">
						Delete
					</button>
					<button class="light">
						Cancel
					</button>
				</div>
			</div>
        `
    }
}
