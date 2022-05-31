
import {html, LitElement} from "lit"

import {dashify} from "../../../toolbox/dashify.js"
import {virtualFiveStar} from "../virtual/virtual-five-star.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {ModalControls, Popup, PopupOptions} from "./modal-types.js"

import namakaModalsCss from "./namaka-modals.css.js"
import banUserModalViewCss from "./views/ban-user/ban-user-modal-view.css.js"
import deletePostModalViewCss from "./views/delete-post/delete-post-modal-view.css.js"
import reportUserModalViewCss from "./views/report-user/report-user-modal-view.css.js"

@mixinStyles(
	namakaModalsCss,
	banUserModalViewCss,
	reportUserModalViewCss,
	deletePostModalViewCss,
	virtualFiveStar.styles,
)
export class NamakaModals extends LitElement {

	static readonly elementName = dashify(NamakaModals.name)

	#popups = new Set<Popup>()

	get #top() {
		return window.scrollY ?? 0
	}

	controls: ModalControls = {

		component: this,

		openModal: ({
				renderContent,
				onClose = () => {},
				onBlanketClick = ({closeModal}) => closeModal(),
			}: PopupOptions) => {

			const newPopup: Popup = {
				onBlanketClick,
				actions: {
					closeModal: () => {
						this.#popups.delete(newPopup)
						this.requestUpdate()
						onClose()
					},
				},
				renderContent,
			}

			this.#popups.add(newPopup)
			this.requestUpdate()

			return newPopup.actions
		},

		confirm: async({
				onBlanketClick = ({closeModal}) => closeModal(),
				renderNo = () => html`no`,
				renderYes = () => html`yes`,
				renderContent,
			}) => new Promise((resolve) => {

			let result = false
			this.controls.openModal({
				onBlanketClick,
				renderContent: ({closeModal}) => {
					const yes = () => {
						result = true
						closeModal()
					}
					const no = () => {
						result = false
						closeModal()
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
			${[...this.#popups].map(openModal => html`
				<div class=popup>

					<div
						class=blanket
						@click=${() => openModal.onBlanketClick({
							closeModal: openModal.actions.closeModal,
						})}
					></div>

					<div class=content style="top: ${this.#top}px">
						${openModal.renderContent(openModal.actions)}
					</div>
				</div>
			`)}
		`
	}
}
