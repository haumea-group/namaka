var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { mixinStyles } from "../../../framework/mixins/mixin-styles.js";
import NamakaEditCommentCss from "./index.css.js";
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js";
import { virtualFiveStar } from "../../virtual/virtual-five-star.js";
let NamakaEditComment = class NamakaEditComment extends LitElement {
    constructor() {
        super(...arguments);
        this.FiveStar = virtualFiveStar.attach({
            component: this,
            state: {
                rating: 100,
                editable: true,
            }
        });
    }
    render() {
        const { FiveStar } = this;
        return html `
			<div class="edit-review" part="container">
				<div class="box1">
					<div class="heading">
						<span part="title" part="title">Edit Review</span>
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
						<p><span part="bold">Edit your feedback to this user</span> <span class="gray">(This will be made public)</span></p>
						<namaka-textarea></namaka-textarea>
						<!-- <textarea name="message" id="message" rows="10"></textarea> -->
					</div>
					<button part="primaryColor">Submit</button>
				</div>
			</div>
		`;
    }
};
NamakaEditComment = __decorate([
    mixinStyles(NamakaEditCommentCss, virtualFiveStar.styles)
], NamakaEditComment);
export { NamakaEditComment };
//# sourceMappingURL=index.js.map