import {debounce} from "@chasemoskal/snapstate"
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"
import copyIcon from "../../../icons/akar/copy.svg.js"
import checkSquare from "../../../icons/akar/check-square.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import reportModalCss from "../modals/views/report-user/report-user-modal-view.css.js"

@mixinStyles(reportModalCss)
export class NamakaCopyToClipboard extends LitElement {
	@property()
	inviteCopied: boolean = false

	@property()
	copyText: string = ""

	@property()
	showCopyIcon: boolean = false
	
	hideInviteCopiedIndicator = debounce(4000, () => {
		this.inviteCopied = false
		this.showCopyIcon = false
	})

	setCopyIcon(bool: boolean) {
		if (!this.inviteCopied) {
			this.showCopyIcon = bool
		}
	}

	legacyCopyToClipboard(text: string) {
		try {
			const textarea = document.createElement("textarea")
			textarea.value = text
			textarea.style.top = "0"
			textarea.style.left = "0"
			textarea.style.position = "fixed"
			textarea.style.visibility = "hidden"
			document.body.appendChild(textarea)
			textarea.focus()
			textarea.select()
			return document.execCommand("copy")
		}
		finally {
			return false
		}
	}
	
	copyToClipboard() {
		const copyText = this.copyText
		if (!this.inviteCopied) {
			navigator.clipboard.writeText(copyText).then(() => {
				console.log("copied", copyText)
				this.inviteCopied = true
			}, (err) => {
				console.error("could not copy text", err)
				this.legacyCopyToClipboard(copyText)
			}).finally(() => {
				this.hideInviteCopiedIndicator()
			})
		}
	}

	render() {
		return html`
		<div @mouseenter=${() => this.setCopyIcon(true)}
			@mouseleave=${() => this.setCopyIcon(false)} 
			@click=${() => this.copyToClipboard()} class="flex kupa">
			<div class="background">
				${this.copyText}
				<div class="copy-container">
					${this.showCopyIcon &&
					!this.inviteCopied ?
					html`<div class="copy-icon">${copyIcon}</div>` : this.inviteCopied ?
					html`<div class="check-square"><span>Copied!</span>${checkSquare}<div>` : null}
				</div>
			</div>
		</div>
	`
	}
}
