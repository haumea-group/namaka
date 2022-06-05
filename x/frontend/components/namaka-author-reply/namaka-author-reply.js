var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import namakaAuthorReplyCss from "./namaka-author-reply.css.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import { validateCommentBody } from "../../../api/services/validators/validators.js";
let NamakaAuthorReply = class NamakaAuthorReply extends LitElement {
    render() {
        return html `
			<div class="outer-div" part="container">
				<namaka-avatar></namaka-avatar>
				<div class="inner-div">
					<p>You may reply to this review here (This will be made public)</p>
					<namaka-textarea .validator=${validateCommentBody} maxCharacters="580"></namaka-textarea>
					<div class="action-btns">
						<button part="button">Reply</button>
						<button part="cancelButton button">Close</button>
					</div>
				</div>
			</div>
		`;
    }
};
NamakaAuthorReply = __decorate([
    mixinStyles(namakaAuthorReplyCss)
], NamakaAuthorReply);
export { NamakaAuthorReply };
//# sourceMappingURL=namaka-author-reply.js.map