
import {css} from "lit"
export default css`

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

button {
	opacity: 0.5;
	background: transparent;
	padding: 0.1em 0.5em;
	color: inherit;
	font: inherit;
	border: 1px solid;
	border-radius: 3px;
	cursor: pointer;
}

button:is(:hover, :focus) {
	opacity: 1;
}

button:active {
	opacity: 0.6;
}

button:disabled {
	opacity: 0.2;
	cursor: default;
	border-style: dashed;
}

`
