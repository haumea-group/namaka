
import {css} from "lit"
export default css`

.modalview.deletepost {}

.modalview.deletepost .header {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.modalview.deletepost .header svg {
	width: 1.5rem;
	height: 1.5rem;
}

.modalview.deletepost .body {
	padding: 0 2rem;
	text-align: left;
}

.modalview.deletepost blockquote {
	line-height: 1.2;
}

.modalview.deletepost .sub-txt {
	text-align: right;
	margin-top: 0.4em;
	opacity: 0.7;
}

.modalview.deletepost .selection {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	padding: 1rem 2rem;
}

.modalview.deletepost label:hover {
	cursor: pointer;
}

.modalview.deletepost .buttons {
	margin: 1rem 2rem;
	margin-bottom: 0;
	padding: 1em 0;
	border-top: 1px solid;
}

`
