
import {snapstate} from "@chasemoskal/snapstate"
import {mixinStyles} from "./mixins/mixin-styles.js"
import {css, CSSResultGroup, html, LitElement, TemplateResult} from "lit"

export interface VirtualConnection<xState, xPublic, xProps> {
	public: xPublic
	render(state: xState, props: xProps): TemplateResult | null
	disconnect(): void
}

export interface VirtualComponentDetails<xState, xDetails, xPublic, xProps> {
	styles?: CSSResultGroup
	initialState: xState
	setup: ({}: {
		component: LitElement
		state: xState
	}) => (details: xDetails) => VirtualConnection<xState, xPublic, xProps>
}

export interface VirtualComponentInstance<xDetails, xPublic, xProps> {
	(props: xProps): TemplateResult | null
	public: xPublic
	connect(details: xDetails): void
	disconnect(): void
}

export interface VirtualComponentBuilder<xDetails, xPublic, xProps> {
	(component: LitElement): VirtualComponentInstance<xDetails, xPublic, xProps>
	styles: CSSResultGroup
}

export function virtualComponent<xState, xDetails, xPublic, xProps>({
		styles, initialState, setup,
	}: VirtualComponentDetails<xState, xDetails, xPublic, xProps>):
		VirtualComponentBuilder<xDetails, xPublic, xProps> {

	function builder(component: LitElement) {
		const snap = snapstate(initialState)
		const connect = setup({component, state: snap.state})

		let isConnected = false
		let unsubscribeSnap = () => {}
		let result: VirtualConnection<xState, xPublic, xProps> = {
			public: <any>undefined,
			render() { throw new Error("virtual component is not connected (cannot render)") },
			disconnect() { throw new Error("virtual component is not connected (cannot disconnect)") },
		}

		function instance(props: xProps) {
			return result.render(snap.readable, props)
		}
		instance.public = result.public
		instance.disconnect = result.disconnect
		instance.connect = (details: xDetails) => {
			if (isConnected)
				throw new Error("virtual component is already connected (cannot connect)")
			isConnected = true
			unsubscribeSnap = snap.subscribe(() => component.requestUpdate())
			result = connect(details)
			instance.public = result.public
			instance.disconnect = () => {
				if (!isConnected)
					throw new Error("virtual component is already disconnected (cannot disconnect)")
				isConnected = false
				result.disconnect()
				unsubscribeSnap()
			}
		}

		return <VirtualComponentInstance<xDetails, xPublic, xProps>>instance
	}
	builder.styles = styles

	return <VirtualComponentBuilder<xDetails, xPublic, xProps>>builder
}

const virtualCounter = virtualComponent({

	styles: css``,

	initialState: {count: 0},

	setup: ({state, component}) => (details: void) => {

		function increment() {
			state.count += 1
		}

		return {
			public: {increment},
			disconnect: () => {},
			render: (state, props: void) => html`
				<p>Count is ${state.count}</p>
				<button @click=${increment}>increment</button>
			`,
		}
	}
})

@mixinStyles(virtualCounter.styles)
class MyComponent extends LitElement {

	#Counter = virtualCounter(<LitElement>this)

	connectedCallback() {
		super.connectedCallback()
		this.#Counter.connect()
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.#Counter.disconnect()
	}

	render() {
		return html`
			<div>
				${this.#Counter()}
			</div>
		`
	}
}
