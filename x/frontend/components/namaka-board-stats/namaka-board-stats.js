var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import namakaBoardStatsCss from "./namaka-board-stats.css.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import { mixinStandard } from "../../framework/mixins/mixin-standard.js";
import { property } from "lit/decorators.js";
function ratingToNumberOfStars(rating) {
    return (rating / 25) + 1;
}
let NamakaBoardStats = class NamakaBoardStats extends mixinStandard()(LitElement) {
    constructor() {
        super(...arguments);
        this.topic = "";
    }
    async firstUpdated() {
        this.stats = await this.context.commenting.getTopicStats(this.topic);
    }
    render() {
        var _a, _b;
        return html `
			<div class="review-summary" part="container">
				<!-- <namaka-my-review></namaka-my-review> -->
				<div class="flex-container">
					<div class="wrapper">
						<div>
							<span class="big">
								${ratingToNumberOfStars(((_b = (_a = this.stats) === null || _a === void 0 ? void 0 : _a.scoring) === null || _b === void 0 ? void 0 : _b.averageScore) || 0)}
							</span>
							<span class="small">/5</span>
						</div>

						<p>Based on 1,321 reviews</p>
					</div>

					<namaka-horizontal-review></namaka-horizontal-review>
				</div>
			</div>
		`;
    }
};
__decorate([
    property({ type: String })
], NamakaBoardStats.prototype, "topic", void 0);
__decorate([
    property({ type: Object })
], NamakaBoardStats.prototype, "stats", void 0);
NamakaBoardStats = __decorate([
    mixinStyles(namakaBoardStatsCss)
], NamakaBoardStats);
export { NamakaBoardStats };
//# sourceMappingURL=namaka-board-stats.js.map