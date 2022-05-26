
import {css} from "lit"
export default css`

.modalview.deletepost {
	background: #f002;
}

.modalview.deletepost .header {
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
}

.modalview.deletepost .body {
	padding: 0 2em;
	text-align: left;
}

.modalview.deletepost blockquote {
	margin: 0.2em 0 0 2em;
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
	row-gap: 0.5rem;
	padding: 1rem 2rem;
}

.modalview.deletepost label:hover {
	cursor: pointer;
}

.modalview.deletepost .buttons {
	margin: auto;
	padding: 1em 0;
	border-top: 1px solid;
}

`
