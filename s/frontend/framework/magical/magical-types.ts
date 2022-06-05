
import {TemplateResult, CSSResultGroup} from "lit"

export interface Use {
	state<T>(value: T): [T, (value: T) => void]
	effect(e: (rerender: () => void) => () => void): void
}

export interface Renderer<xProps extends any[]> {
	(...props: xProps): TemplateResult | null
	css?: CSSResultGroup
}

export type Sauce<xProps extends any[]> = (
	(use: Use) => Renderer<xProps>
)
