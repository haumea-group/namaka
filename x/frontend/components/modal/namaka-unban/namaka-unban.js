var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import xCircleSvg from "../../../../icons/feather/x-circle.svg.js";
import infoCircleSvg from "../../../../icons/tabler/info-circle.svg.js";
import { mixinStyles } from "../../../framework/mixins/mixin-styles.js";
import NamakaUnbanCss from "./namaka-unban.css.js";
let NamakaUnban = class NamakaUnban extends LitElement {
    render() {
        return html `
			<div class="ban-user" part="container">
				<div class="border-b">
					<div class="heading">
						<div class="heading__text">
							<div class="info">${infoCircleSvg}</div>
							<h1 part="title" part="title">
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
					<button part="primaryColor button">
						Unban
					</button>
					<button part="cancelButton button">
						Cancel
					</button>
				</div>
			</div>
        `;
    }
};
NamakaUnban = __decorate([
    mixinStyles(NamakaUnbanCss())
], NamakaUnban);
export { NamakaUnban };
//# sourceMappingURL=namaka-unban.js.map