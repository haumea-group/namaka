var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { mixinStyles } from "../../../framework/mixins/mixin-styles.js";
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js";
import namakaWriteACommentCss from "./namaka-write-a-comment.css.js";
import { virtualFiveStar } from "../../virtual/virtual-five-star.js";
let NamakaWriteAComment = class NamakaWriteAComment extends LitElement {
    constructor() {
        super(...arguments);
        this.FiveStar = virtualFiveStar.attach({
            component: this,
            state: {
                rating: 50,
                editable: true,
            },
        });
    }
    render() {
        const { FiveStar } = this;
        return html `
			<div class="add-review" part="container">
				<div class="box1">
					<div class="heading">
						<span part="title" part="title">Leave a Review</span>
						<div>${xCircleSvg}</div>
					</div>
					<p class="gray">Share your experience with the ValorExchange community, to help make better decisions</p>
				</div>
				<div class="share">
					<div class="group">
						<div>
							<p part="subtitle">Share Review?</p>
							<p class="gray">Please choose a review to rate this particular user.</p>
						</div>
						${FiveStar()}
					</div>
					<div class="edit-feedback">
						<p><span part="bold">Leave a feedback to this user</span> <span class="gray">(This will be made public)</span></p>
						<namaka-textarea></namaka-textarea>
					</div>
					<button part="primaryColor">Submit</button>
				</div>
			</div>
		`;
    }
};
NamakaWriteAComment = __decorate([
    mixinStyles(namakaWriteACommentCss, virtualFiveStar.styles)
], NamakaWriteAComment);
export { NamakaWriteAComment };
//# sourceMappingURL=namaka-write-a-comment.js.map