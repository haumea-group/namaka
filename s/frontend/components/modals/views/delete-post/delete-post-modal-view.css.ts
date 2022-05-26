
import {css} from "lit"
export default css`

.modalview.deletepost {
	background: #f002;
}

.header {
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
}

.body {
	padding: 0 2em;
	text-align: left;
}

blockquote {
	margin: 0.2em 0 0 2em;
	line-height: 1.2;
}

.sub-txt {
	text-align: right;
	margin-top: 0.4em;
	opacity: 0.7;
}

.selection {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	row-gap: 0.5rem;
	padding: 1rem 2rem;
}

label:hover {
	cursor: pointer;
}

.buttons {
	margin: auto;
	padding: 1em 0;
	border-top: 1px solid;
}

`
