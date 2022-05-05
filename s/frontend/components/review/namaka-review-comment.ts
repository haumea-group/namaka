import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"
import binSvg from "../../../icons/feather-Icons/bin.svg.js"
import infoSquareSvg from "../../../icons/info-square.svg.js"
import dangerSvg from "../../../icons/feather-Icons/danger.svg.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaReviewCommentCss from "./namaka-review-comment.css.js"

@mixinStyles(namakaReviewCommentCss)
export class NamakaReviewComment extends LitElement {
	@property()
	showDropDown = false

	#toggleDropDown = () => {
		this.showDropDown = !this.showDropDown
	}

	#renderDropDown = () => {
		return html`
			<div class="drop-down">
				<div class="report">
					${infoSquareSvg}
					<button>Report user</button>
				</div>
				<div class="suspend">
					<span>${dangerSvg}</span>
					<button>Suspend user</button>
				</div>
				<div class="delete">
					<span>${binSvg}</span>
					<button>Delete Review</button>
				</div>
			</div>
	`}

	render() {
		return html`
			<div class="outer-div">
				<div class="avatar"></div>
				<div class="inner-div">
					<div class="header">
						<div class="header__txt">
							<p>Francesca20</p>
							<li><span>Buy BTC - Bank Transfer</span></li>
						</div>
						<div class="header__btn">
							<button @click=${this.#toggleDropDown} class="drop-down__btn">
								&bull;&bull;&bull;
							</button>
						</div>
					</div>
					<p>Aut sunt tempore eligendi. Eum corrupti voluptatem et qui excepturi officia. Debitis quae voluptates dolorum tempora laborum blanditiis ut fugiat. Consectetur perferendis sed et molestiae consequuntur culpa.</p>
					<div class="footer">
						<p class="time-stamp">1 hour ago</p>
						<li><span>12 comments</span></li>
						<button>Reply</button>
					</div>
				</div>
			</div>
			${this.showDropDown ? this.#renderDropDown() : null}
		`
	}
}
