import {html, LitElement} from "lit"
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js"
import infoCircleSvg from "../../../../icons/tabler/info-circle.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaDeleteReviewCss from "./namaka-delete-review.css.js"

@mixinStyles(namakaDeleteReviewCss)
export class NamakaDeleteReview extends LitElement {
	render() {
		return html`
			<div class="delete-review" part='container'>
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${infoCircleSvg}</div>
							<h1 class="title" part="title">
								<slot name="title">Title</slot>
							</h1>
						</div>
						<div>${xCircleSvg}</div>
					</div>
					<p class="gray">
						<slot name="text">You can edit this text</slot>
					</p>
				</div>

				<div class="action">
					<button part="dangerBtn button">
						Delete
					</button>
					<button part="cancelBtn button">
						Cancel
					</button>
				</div>
			</div>
        `
    }
}
