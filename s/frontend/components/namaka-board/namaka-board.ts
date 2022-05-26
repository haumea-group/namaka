import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../../namaka.js"

import NamakaBoardCss from "./namaka-board.css.js"
import noDataSvg from "../../../icons/tabler/no-data.svg.js"

@mixinStyles(NamakaBoardCss)
export class NamakaBoard extends LitElement {
	@property({type: Boolean})
	private noComments: boolean = true

	#renderWhenEmpty = () => {
		return html`
			<div class="box">
				<slot name="no-comment-icon">${noDataSvg}</slot>
				<slot name="no-comment-text" class="gray">
					No comments/reviews (you can slot in a different text)
				</slot>
			</div>
		`
	}

	render() {
		return html`
			<div part="board container" class="board">
				<div class="header" part="header">
					<slot name="header__text">slot in a header text</slot>
					<select part="sort" name="tag" id="tag">
						<option value="mostRecent">Most Recent</option>
						<option value="all">All</option>
					</select>
				</div>
				<div class="body" part="body">
					${this.noComments ? this.#renderWhenEmpty() : null}
				</div>
				<button
					@click=${() => {this.noComments = !this.noComments}}>
					Load More
				</button>
			</div>
		`
	}
}
