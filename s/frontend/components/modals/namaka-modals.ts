
import {html, LitElement} from "lit"

import {dashify} from "../../../toolbox/dashify.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {ModalControls, Popup, PopupOptions} from "./modal-types.js"

import namakaModalsCss from "./namaka-modals.css.js"

@mixinStyles(namakaModalsCss)
export class NamakaModals extends LitElement {

	static readonly elementName = dashify(NamakaModals.name)

	#popups = new Set<Popup>()

	get #top() {
		return window.scrollY ?? 0
	}

	controls: ModalControls = {

		popup: ({
				renderPopup,
				closeOnBlanketClick,
				onClose = () => {},
			}: PopupOptions) => {

			const newPopup: Popup = {
				closeOnBlanketClick,
				actions: {
					close: () => {
						this.#popups.delete(newPopup)
						this.requestUpdate()
						onClose()
					},
				},
				renderPopup,
			}

			this.#popups.add(newPopup)
			this.requestUpdate()

			return newPopup.actions
		},

		confirm: async({
				closeOnBlanketClick = true,
				renderNo = () => html`no`,
				renderYes = () => html`yes`,
				renderContent,
			}) => new Promise((resolve) => {

			let result = false
			this.controls.popup({
				closeOnBlanketClick,
				renderPopup: ({close}) => {
					const yes = () => {
						result = true
						close()
					}
					const no = () => {
						result = false
						close()
					}
					return html`
						<div class=innercontent>
							${renderContent({yes, no})}
						</div>
						<div class=buttons>
							<button class=yes @click=${yes}>${renderYes()}</button>
							<button class=no @click=${no}>${renderNo()}</button>
						</div>
					`
				},
				onClose: () => resolve(result),
			})
		}),
	}

	render() {
		return html`
			${[...this.#popups].map(popup => html`
				<div class=popup>

					<div
						class=blanket
						@click=${popup.closeOnBlanketClick ?popup.actions.close :() => {}}
					></div>

					<div class=content style="top: ${this.#top}px">
						${popup.renderPopup(popup.actions)}
					</div>
				</div>
			`)}
		`
	}
}
