import {html, LitElement} from "lit"

import {mixinStyles} from "../../../namaka.js"

import NamakaBoardCss from "./namaka-board.css.js"

@mixinStyles(NamakaBoardCss)
export class NamakaBoard extends LitElement {
	render() {
		return html`
			<div part="board" class="board">
				<div class="header" part="header">
					<slot name="header__text">slot in a header text</slot>
					<select part="sort" name="tag" id="tag">
						<option value="mostRecent">Most Recent</option>
						<option value="all">All</option>
					</select>
				</div>
				<button>Load More</button>
			</div>
		`
	}
}
