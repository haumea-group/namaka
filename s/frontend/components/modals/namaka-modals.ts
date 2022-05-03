
import {html, LitElement} from "lit"

import {ModalControls, Popup, PopupOptions} from "./modal-types.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"

import namakaModalsCss from "./namaka-modals.css.js"

@mixinStyles(namakaModalsCss)
export class NamakaModals extends LitElement {

	#popups = new Set<Popup>()

	get #top() {
		return window.scrollY ?? 0
	}

	controls: ModalControls = {

		popup: ({renderPopup}: PopupOptions) => {
			const newPopup: Popup = {
				renderPopup,
				actions: {
					close: () => {
						this.#popups.delete(newPopup)
						this.requestUpdate()
					},
				},
			}
			this.#popups.add(newPopup)
			this.requestUpdate()
			return newPopup.actions
		},
	}

	render() {
		return html`
			${[...this.#popups].map(popup => html`
				<div class=popup>
					<div class=blanket></div>
					<div class=content style="top: ${this.#top}px">
						${popup.renderPopup(popup.actions)}
					</div>
				</div>
			`)}
		`
	}
}
