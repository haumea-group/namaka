
import {LitElement, TemplateResult} from "lit"

export interface PopupActions {
	close(): void
}

export interface RenderPopup {
	({}: PopupActions): TemplateResult
}

export interface PopupOptions {
	closeOnBlanketClick: boolean
	renderPopup: RenderPopup
	onClose?(): void
}

export interface Popup {
	closeOnBlanketClick: boolean
	actions: PopupActions
	renderPopup: RenderPopup
}

export interface ModalControls {
	component: LitElement
	popup(options: PopupOptions): PopupActions
	confirm({}: {
		closeOnBlanketClick?: boolean
		renderYes?(): TemplateResult
		renderNo?(): TemplateResult
		renderContent({}: {
			yes(): void
			no(): void
		}): TemplateResult
	}): Promise<boolean>
}
