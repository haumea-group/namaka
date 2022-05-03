
import {css} from "lit"
export default css`

:host {
	position: relative;
	display: block;
	z-index: 1;
}

.blanket {
	position: fixed;
	background: #0008;
	backdrop-filter: blur(1em);
	inset: 0;
}

.content {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: 10vh auto;
	border: 1px solid;
	width: 100%;
	max-width: 32em;
}

`
