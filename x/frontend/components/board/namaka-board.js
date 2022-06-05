var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NamakaBoard_postRandomComment;
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import { mixinStandard } from "../../framework/mixins/mixin-standard.js";
import { randomComment, randomSubject } from "../../../toolbox/randomly.js";
import { recursivelyRenderComments } from "./utils/recursively-render-comments.js";
import namakaCommentsCss from "./namaka-board.css.js";
let NamakaBoard = class NamakaBoard extends mixinStandard()(LitElement) {
    constructor() {
        super(...arguments);
        _NamakaBoard_postRandomComment.set(this, async () => {
            await this.context.commenting.postComment({
                topicId: this.topic,
                parentCommentId: undefined,
                subject: randomSubject(),
                body: [randomComment(), randomComment(), randomComment()].join(" "),
                scores: [
                    { aspect: "flavor", score: Math.random() * 100 },
                    { aspect: "presentation", score: Math.random() * 100 },
                ],
            });
        });
    }
    async firstUpdated() {
        if (!this.topic)
            throw new Error("topic attribute is required");
        await this.context.commenting.downloadComments(this.topic);
    }
    render() {
        if (!this.topic)
            return null;
        const isLoggedIn = !!this.context.auth.user;
        const comments = this.context.commenting.getComments(this.topic);
        return html `
			<section>
				<div class=buttons>
					<button
						@click=${__classPrivateFieldGet(this, _NamakaBoard_postRandomComment, "f")}
						?disabled=${!isLoggedIn}>
							post a comment
					</button>
				</div>
				<div class=comments>
					${recursivelyRenderComments(comments)}
				</div>
			</section>
		`;
    }
};
_NamakaBoard_postRandomComment = new WeakMap();
__decorate([
    property({ type: String })
], NamakaBoard.prototype, "topic", void 0);
NamakaBoard = __decorate([
    mixinStyles(namakaCommentsCss)
], NamakaBoard);
export { NamakaBoard };
//# sourceMappingURL=namaka-board.js.map