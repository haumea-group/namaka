
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js"

import {Validator} from "../../../toolbox/darkvalley.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"

import NamakaTextareaCss from "./namaka-textarea.css.js"

export class ValueChangeEvent<xValue> extends CustomEvent<{value: xValue, isValid: boolean}> {
	constructor(value: xValue, isValid: boolean) {
		super("valuechange", {
			bubbles: true,
			composed: true,
			detail: {value, isValid},
		})
	}
}

@mixinStyles(NamakaTextareaCss)
export class NamakaTextarea extends LitElement {

	@property({type: String})
	"initial-value": string = ""

	@property({type: String})
	private inputValue: string = ""

	@property({type: Number})
	maxCharacters: number = 1000

	private problems: string[] = []

	@property({type: Function})
	validator: Validator<string> = () => []

	#handleInput = (event: Event) => {
		const input = event.target as HTMLTextAreaElement;
		this.inputValue = input.value
		this.problems = this.validator(this.inputValue)
		this.dispatchEvent(new ValueChangeEvent(this.inputValue, this.problems.length === 0))
	}
	
	render() {
		const valid = this.problems.length === 0
		return html`
			<textarea
				autofocus
				part="textarea"
				.value="${this["initial-value"]}"
				@input=${this.#handleInput}
				placeholder="Enter your text here..."
			></textarea>
			<div>
				<span class=${valid ? "valid" : "invalid"}>
					${alertTriangleSvg}
				</span>
				${!valid
					? html`
						<ol part="problems">
							${this.problems.map(problem => html `
								<li>${problem}</li>
							`)}
						</ol>
					`
					: html`
						<p>Text count 
							<span class="char-count">${this.inputValue.length}/${this.maxCharacters}</span>
							characters
						</p>`}
			</div>
		`
	}
}
