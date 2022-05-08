
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaValidatedInputCss from "./namaka-validated-input.css.js"

@mixinStyles(namakaValidatedInputCss)
export class NamakaValidatedInput extends LitElement {

	@property({type: String})
	private inputValue: string = ""

	@property({type: Boolean})
	private validInput: boolean = false

	#validateInput = () => {
		console.log("validation occurs");
		
		if(!this.inputValue.match(/(\w){5,}/)) {
			this.validInput = true
		} else {
			this.validInput = false
		}
	}

	#handleInput = (event: Event) => {
		const input = event.target as HTMLTextAreaElement;
		this.inputValue = input.value
		this.#validateInput()
	}
	
	render() {
		return html`
			<div class="outer-div">
				<img src="/assets/profile-img.png" />
				<div class="inner-div">
					<p>You may reply to this review here (This will be made public)</p>
					<textarea id="text" placeholder="Enter your text here..." @input=${this.#handleInput}></textarea>
					${this.validInput ? html`<p>too short</p>` : html`<p>${this.inputValue.length} / 1000</p>`}
					<div class="action-btns">
						<button>Reply</button>
						<button>Close</button>
					</div>
				</div>
			</div>
		`
	}
}
