
import {TemplateResult} from "lit"

export interface Use {
	state<T>(value: T): [T, (value: T) => void]
	effect(e: () => () => void): void
}

export type Renderer<xProps extends any[]> = (
	(...props: xProps) => TemplateResult | null
)

export type Sauce<xProps extends any[]> = (
	(use: Use) => Renderer<xProps>
)
