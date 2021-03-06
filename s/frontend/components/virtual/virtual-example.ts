
import {html, css} from "lit"
import {virtual} from "../../framework/virtual.js"

export const virtualExample = virtual({

	styles: css`
		p {
			color: red;
		}
	`,

	initialState: {
		count: 0,
	},

	setup: ({getState, setState}, details: void) => {

		function increment() {
			setState({
				count: getState().count + 1,
			})
		}

		return (state, props: void) => html`
			<p>count is ${state.count}</p>
			<button @click=${increment}>increment</button>
		`
	},
})
