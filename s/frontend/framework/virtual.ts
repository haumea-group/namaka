
import {clone} from "../../toolbox/clone.js"
import {css, CSSResultGroup, LitElement, TemplateResult} from "lit"

export function virtual<xState, xDetails = void, xProps = void>({
		initialState,
		styles = css``,
		setup,
	}: {
		initialState: xState
		styles?: CSSResultGroup
		setup: (
			options: SetupOptions<xState>,
			details: xDetails,
		) => RenderDefinition<xState, xProps>
	}): Attachable<xState, xDetails, xProps> {

	return {
		styles,
		attach(
				{
					component,
					state = initialState,
					onStateChange = () => {},
				}: AttachOptions<xState>,
				details: xDetails,
			): Render<xState, xProps> {

			function getState() {
				return <xState>Object.freeze(clone(state))
			}

			function setState(newState: xState) {
				state = newState
				component.requestUpdate()
				onStateChange(getState())
			}

			const render = setup({component, getState, setState}, details)

			function finalRender(props: xProps): TemplateResult | null {
				return render(
					getState(),
					props,
				)
			}

			finalRender.setState = setState
			Object.defineProperty(finalRender, "state", {
				get: getState,
				configurable: false,
			})

			return <Render<xState, xProps>>finalRender
		},
	}
}

export interface SetupOptions<xState> {
	getState(): xState
	setState(newState: xState): void
	component: LitElement
}

export type RenderDefinition<xState, xProps> = (
	state: xState,
	props: xProps,
) => TemplateResult | null

export interface Render<xState, xProps> {
	(props: xProps): TemplateResult | null
	readonly state: xState
	setState(newState: xState): void
}

export interface AttachOptions<xState> {
	component: LitElement
	state?: xState
	onStateChange?: (state: xState) => void
}

export interface Attachable<xState, xDetails, xProps> {
	attach({}: AttachOptions<xState>, details: xDetails): Render<xState, xProps>
	styles: CSSResultGroup
}
