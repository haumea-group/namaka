var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { mixinStyles } from "../../../framework/mixins/mixin-styles.js";
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js";
import NamakaArchiveCommentCss from "./namaka-archive-comment.css.js";
import infoCircleSvg from "../../../../icons/tabler/info-circle.svg.js";
let NamakaArchiveComment = class NamakaArchiveComment extends LitElement {
    render() {
        return html `
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
			`;
    }
};
NamakaArchiveComment = __decorate([
    mixinStyles(NamakaArchiveCommentCss)
], NamakaArchiveComment);
export { NamakaArchiveComment };
//# sourceMappingURL=namaka-archive-comment.js.map