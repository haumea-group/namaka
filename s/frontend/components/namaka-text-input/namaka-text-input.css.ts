
import {css} from "lit"
export default css`
textarea {
	width: 100%;
	background-color: var(--bg-input, transparent);
	border: 1px solid;
	border-color: var(--input-border-color, #DDE2E5);
	padding: 1.5rem 1rem;
	border-radius: 4px;
	color: var(--input-txt-color, inherit);
	overflow: auto;
	resize: vertical;
}
`
