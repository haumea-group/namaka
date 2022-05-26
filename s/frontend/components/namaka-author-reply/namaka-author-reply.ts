
import {html, LitElement} from "lit"
import namakaAuthorReplyCss from "./namaka-author-reply.css.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {validateCommentBody} from "../../../api/services/validators/validators.js"

@mixinStyles(namakaAuthorReplyCss)
export class NamakaAuthorReply extends LitElement {
	
	render() {
		return html`
			<div class="outer-div" part="container">
				<img src="/assets/profile-img.png" />
				<div class="inner-div">
					<p>You may reply to this review here (This will be made public)</p>
					<namaka-textarea .validator=${validateCommentBody} maxCharacters="580"></namaka-textarea>
					<div class="action-btns">
						<button part="button">Reply</button>
						<button part="cancelButton button">Close</button>
					</div>
				</div>
			</div>
		`
	}
}
