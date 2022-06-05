var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { mixinStyles } from "../../../framework/mixins/mixin-styles.js";
import namakaHorizontalReviewCss from "./index.css.js";
let NamakaHorizontalReview = class NamakaHorizontalReview extends LitElement {
    render() {
        return html `
			<div class="horizontal-review">
				<div class="grid">
					<div class="flex">
						<span class="gray">5 star</span>
						<div class="line">
						   <div class="fill"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">4 star</span>
						<div class="line">
						   <div class="fill w-4"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">3 star</span>
						<div class="line">
						   <div class="fill w-3"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">2 star</span>
						<div class="line">
						   <div class="fill w-2"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">1 star</span>
						<div class="line">
						   <div class="fill w-1"></div>
						</div>
					</div>
					<div class="flex">
						<span class="gray">No star</span>
						<div class="line">
						   <div class="fill w-0"></div>
						</div>
					</div>
				</div>
			</div>
		`;
    }
};
NamakaHorizontalReview = __decorate([
    mixinStyles(namakaHorizontalReviewCss)
], NamakaHorizontalReview);
export { NamakaHorizontalReview };
//# sourceMappingURL=index.js.map