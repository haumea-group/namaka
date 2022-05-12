
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaAuthorReplyCss from "./namaka-author-reply.css.js"

@mixinStyles(namakaAuthorReplyCss)
export class NamakaAuthorReply extends LitElement {
	
	render() {
		return html`
			<div class="outer-div">
				<img src="/assets/profile-img.png" />
				<div class="inner-div">
					<p>You may reply to this review here (This will be made public)</p>
					<namaka-text-input maxCharacters="160"></namaka-text-input>
					<div class="action-btns">
						<button>Reply</button>
						<button>Close</button>
					</div>
				</div>
			</div>
		`
	}
}
