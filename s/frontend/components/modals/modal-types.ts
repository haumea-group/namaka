
import {LitElement, TemplateResult} from "lit"

export interface OnBlanketClick {
	({}: {closeModal: () => void}): void
}

export interface PopupActions {
	closeModal(): void
}

export interface RenderContent {
	({}: PopupActions): TemplateResult
}

export interface PopupOptions {
	renderContent: RenderContent
	onClose?(): void
	onBlanketClick?: OnBlanketClick
}

export interface Popup {
	onBlanketClick: OnBlanketClick
	actions: PopupActions
	renderContent: RenderContent
}

export interface ModalControls {
	component: LitElement
	openModal(options: PopupOptions): PopupActions
	confirm({}: {
		onBlanketClick?: OnBlanketClick
		renderYes?(): TemplateResult
		renderNo?(): TemplateResult
		renderContent({}: {
			yes(): void
			no(): void
		}): TemplateResult
	}): Promise<boolean>
}
