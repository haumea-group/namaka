
import {LitElement, TemplateResult} from "lit"

export interface PopupActions {
	closeModal(): void
}

export interface RenderContent {
	({}: PopupActions): TemplateResult
}

export interface PopupOptions {
	closeOnBlanketClick: boolean
	renderContent: RenderContent
	onClose?(): void
}

export interface Popup {
	closeOnBlanketClick: boolean
	actions: PopupActions
	renderContent: RenderContent
}

export interface ModalControls {
	component: LitElement
	openModal(options: PopupOptions): PopupActions
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
