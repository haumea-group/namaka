import { html, css } from "lit";
import { magical } from "../magical.js";
export const ExampleTimer = magical(use => () => {
    const [now, setNow] = use.state(Date.now());
    const [active, setActive] = use.state(false);
    const [start, setStart] = use.state(0);
    const [total, setTotal] = use.state(0);
    const since = now - start;
    const current = active
        ? total + since
        : total;
    use.effect(() => {
        let running = true;
        void function timeloop() {
            setNow(Date.now());
            if (running)
                requestAnimationFrame(timeloop);
        }();
        return () => running = false;
    });
    function handleClick() {
        if (active) {
            setActive(false);
            setTotal(current);
        }
        else {
            setActive(true);
            setStart(now);
        }
    }
    return html `
		<div class=timer ?data-active=${active}>
			<p>timer ${(current / 1000).toFixed(2)}</p>
			<button @click=${handleClick}>${active ? "stop" : "start"}</button>
		</div>
	`;
});
ExampleTimer.css = css `

.timer {
	color: green;
}

.timer p {
	font-family: monospace;
}

.timer[data-active] {
	color: yellow;
}

`;
//# sourceMappingURL=example-timer.js.map