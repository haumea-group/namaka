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
var _NamakaBoardWip_renderWhenEmpty;
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { mixinStyles } from "../../../namaka.js";
import NamakaBoardCss from "./namaka-board-wip.css.js";
import noDataSvg from "../../../icons/tabler/no-data.svg.js";
let NamakaBoardWip = class NamakaBoardWip extends LitElement {
    constructor() {
        super(...arguments);
        this.noComments = true;
        _NamakaBoardWip_renderWhenEmpty.set(this, () => {
            return html `
			<div class="box">
				<slot name="no-comment-icon">${noDataSvg}</slot>
				<slot name="no-comment-text" class="gray">
					No comments/reviews (you can slot in a different text)
				</slot>
			</div>
		`;
        });
    }
    render() {
        return html `
			<div part="board container" class="board">
				<div class="header" part="header">
					<slot name="header__text">slot in a header text</slot>
					<select part="sort" name="tag" id="tag">
						<option value="mostRecent">Most Recent</option>
						<option value="all">All</option>
					</select>
				</div>
				<div class="body" part="body">
					${this.noComments ? __classPrivateFieldGet(this, _NamakaBoardWip_renderWhenEmpty, "f").call(this) : null}
				</div>
				<button
					@click=${() => { this.noComments = !this.noComments; }}>
					Load More
				</button>
			</div>
		`;
    }
};
_NamakaBoardWip_renderWhenEmpty = new WeakMap();
__decorate([
    property({ type: Boolean })
], NamakaBoardWip.prototype, "noComments", void 0);
NamakaBoardWip = __decorate([
    mixinStyles(NamakaBoardCss)
], NamakaBoardWip);
export { NamakaBoardWip };
//# sourceMappingURL=namaka-board-wip.js.map