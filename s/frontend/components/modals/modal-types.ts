
import {TemplateResult} from "lit"

export interface PopupActions {
	close(): void
}

export interface RenderPopup {
	({}: PopupActions): TemplateResult
}

export interface PopupOptions {
	renderPopup: RenderPopup
}

export interface Popup extends PopupOptions {
	actions: PopupActions
}

export interface ModalControls {
	popup(options: PopupOptions): PopupActions
}
