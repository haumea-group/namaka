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
var _NamakaTextarea_handleInput;
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import NamakaTextareaCss from "./namaka-textarea.css.js";
let NamakaTextarea = class NamakaTextarea extends LitElement {
    constructor() {
        super(...arguments);
        this.inputValue = "";
        this.maxCharacters = 1000;
        this.problems = [];
        this.validator = () => [];
        _NamakaTextarea_handleInput.set(this, (event) => {
            const input = event.target;
            this.inputValue = input.value;
            this.problems = this.validator(this.inputValue);
        });
    }
    render() {
        const valid = this.problems.length === 0;
        return html `
			<textarea
				autofocus
				part="textarea"
				@input=${__classPrivateFieldGet(this, _NamakaTextarea_handleInput, "f")}
				placeholder="Enter your text here..."
			></textarea>
			<div>
				<span class=${valid ? "valid" : "invalid"}>
					${alertTriangleSvg}
				</span>
				${!valid
            ? html `
						<ol part="problems">
							${this.problems.map(problem => html `
								<li>${problem}</li>
							`)}
						</ol>
					`
            : html `
						<p>Text count 
							<span class="char-count">${this.inputValue.length}/${this.maxCharacters}</span>
							characters
						</p>`}
			</div>
		`;
    }
};
_NamakaTextarea_handleInput = new WeakMap();
__decorate([
    property({ type: String })
], NamakaTextarea.prototype, "inputValue", void 0);
__decorate([
    property({ type: Number })
], NamakaTextarea.prototype, "maxCharacters", void 0);
__decorate([
    property({ type: Function })
], NamakaTextarea.prototype, "validator", void 0);
NamakaTextarea = __decorate([
    mixinStyles(NamakaTextareaCss)
], NamakaTextarea);
export { NamakaTextarea };
//# sourceMappingURL=namaka-textarea.js.map