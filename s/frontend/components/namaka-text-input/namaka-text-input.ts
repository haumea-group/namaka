
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaTextInputCss from "./namaka-text-input.css.js"

@mixinStyles(namakaTextInputCss)
export class NamakaTextInput extends LitElement {

	@property({type: String})
	private inputValue: string = ""

	@property({type: Boolean})
	private validInput: boolean = false

	
	#validateInput = () => {
		if(!this.inputValue.match(/(\w){5,}/)) {
			this.validInput = true
		} else {
			this.validInput = false
		}
	}

	@property({type: Function})
	validator = this.#validateInput

	#handleInput = (event: Event) => {
		const input = event.target as HTMLTextAreaElement;
		this.inputValue = input.value
		this.validator()
	}
	
	render() {
		return html`
			<textarea
				autofocus
				placeholder="Enter your text here..."
				@input=${this.#handleInput}
			></textarea>
			${this.validInput ? html`<p>too short</p>` : html`<p>${this.inputValue.length} / 1000</p>`}
		`
	}
}
