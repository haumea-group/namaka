
import {css} from "lit"
export default css`

:host {
	display: block;
	text-align: left;
}

img {
	align-self: flex-start;
}

.outer-div {
	display: flex;
	padding: 20px;
	gap: 2rem;
	max-width: 540px;
	border: 1px solid #DDE2E5;
	border-radius: 4px;
}

.inner-div {
	flex-basis: 100%;
	display: flex;
	flex-direction: column;
}

.action-btns {
	margin-top: 1.5rem;
}

button {
	border: none;
	background: transparent;
	color: rgba(255,255,255,0.8);
}

`
