
import {html} from "lit"
import {magical} from "./magical.js"

export const Counter = magical(use => (start: number) => {
	const [count, setCount] = use.state(start)
	const [time, setTime] = use.state(Date.now())

	use.effect(() => {
		const interval = setInterval(() => setTime(Date.now()), 111)
		return () => clearInterval(interval)
	})

	function handleClick() {
		setCount(count + 1)
	}

	return html`
		<p>count: ${count}</p>
		<p>time: ${time}</p>
		<button @click=${handleClick}>increment count</button>
	`
})
