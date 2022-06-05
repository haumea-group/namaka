var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { debounce } from "@chasemoskal/snapstate";
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import copyIcon from "../../../icons/akar/copy.svg.js";
import checkSquare from "../../../icons/akar/check-square.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import reportModalCss from "../modals/views/report-user/report-user-modal-view.css.js";
let NamakaCopyToClipboard = class NamakaCopyToClipboard extends LitElement {
    constructor() {
        super(...arguments);
        this.inviteCopied = false;
        this.copyText = "";
        this.showCopyIcon = false;
        this.hideInviteCopiedIndicator = debounce(4000, () => {
            this.inviteCopied = false;
            this.showCopyIcon = false;
        });
    }
    setCopyIcon(bool) {
        if (!this.inviteCopied) {
            this.showCopyIcon = bool;
        }
    }
    legacyCopyToClipboard(text) {
        try {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.top = "0";
            textarea.style.left = "0";
            textarea.style.position = "fixed";
            textarea.style.visibility = "hidden";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            return document.execCommand("copy");
        }
        finally {
            return false;
        }
    }
    copyToClipboard() {
        const copyText = this.copyText;
        if (!this.inviteCopied) {
            navigator.clipboard.writeText(copyText).then(() => {
                console.log("copied", copyText);
                this.inviteCopied = true;
            }, (err) => {
                console.error("could not copy text", err);
                this.legacyCopyToClipboard(copyText);
            }).finally(() => {
                this.hideInviteCopiedIndicator();
            });
        }
    }
    render() {
        return html `
		<div @click=${() => this.copyToClipboard()} class="flex">
			<div class="background"
			@mouseover=${() => this.setCopyIcon(true)}
			@mouseout=${() => this.setCopyIcon(false)}>
				${this.copyText}
				<div class="copy-container">
					${this.showCopyIcon &&
            !this.inviteCopied ?
            html `<div class="copy-icon">${copyIcon}</div>` : this.inviteCopied ?
            html `<div class="check-square"><span>Copied!</span>${checkSquare}<div>` : null}
				</div>
			</div>
		</div>
	`;
    }
};
__decorate([
    property()
], NamakaCopyToClipboard.prototype, "inviteCopied", void 0);
__decorate([
    property()
], NamakaCopyToClipboard.prototype, "copyText", void 0);
__decorate([
    property()
], NamakaCopyToClipboard.prototype, "showCopyIcon", void 0);
NamakaCopyToClipboard = __decorate([
    mixinStyles(reportModalCss)
], NamakaCopyToClipboard);
export { NamakaCopyToClipboard };
//# sourceMappingURL=namaka-copy-to-clipboard.js.map