
import {css} from "lit"
export default css`

:host {
	display: block;
	max-width: 50em;
	border: 1px solid #DDE2E5;
	border-radius: 4px;
	text-align: left;
}

img {
	align-self: flex-start;
}

.outer-div {
	display: flex;
	padding: 1rem;
	gap: 2rem;
}

.inner-div {
	flex-basis: 100%;
	display: flex;
	flex-direction: column;
}

.action-btns {
	margin-top: 1.5rem;
}

`
