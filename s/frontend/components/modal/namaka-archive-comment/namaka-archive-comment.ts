
import {html, LitElement} from "lit"

import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"

import xCircleSvg from "../../../../icons/feather/x-circle.svg.js"
import NamakaArchiveCommentCss from "./namaka-archive-comment.css.js"
import infoCircleSvg from "../../../../icons/tabler/info-circle.svg.js"
@mixinStyles(NamakaArchiveCommentCss)
export class NamakaArchiveComment extends LitElement {
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
					<button part="dangerButton button">
						Delete
					</button>
					<button part="cancelButton button">
						Cancel
					</button>
				</div>
			</div>
			`
		}
}
