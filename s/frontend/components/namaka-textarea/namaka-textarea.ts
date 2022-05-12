
import {html, LitElement} from "lit"
import {property} from "lit/decorators.js"

import {Validator} from "../../../toolbox/darkvalley.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"

import NamakaTextareaCss from "./namaka-textarea.css.js"
import dangerSvg from "../../../icons/feather/danger.svg.js"

@mixinStyles(NamakaTextareaCss)
export class NamakaTextarea extends LitElement {

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
	}
	
	render() {
		const valid = this.problems.length === 0
		return html`
			<textarea
				autofocus
				part="textarea"
				@input=${this.#handleInput}
				placeholder="Enter your text here..."
			></textarea>
			<div>
				<span class=${valid ? "valid" : "invalid"}>
					${dangerSvg}
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
