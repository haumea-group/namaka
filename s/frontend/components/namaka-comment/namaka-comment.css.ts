
import {css} from "lit"
export default css`

:host {
	display: block;
	width: 100%;
	max-width: 62.75rem;
	position: relative;
}

/* * {
	outline: 1px solid #f002;
} */

section {
	display: flex;
	gap: 0.5em;
	border: 1px solid;
	padding: 0.5em;
	border-radius: 0.5em;
}

.plate {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

header {
	display: flex;
	align-items: center;
	gap: 0.5em;
	height: 3em;
}

header .nickname {
	font-size: 1.2em;
	font-weight: bold;
}

header .fivestar {
	margin-left: auto;
}

header .dropdownbutton {
	border: 0;
}

.text {
	display: flex;
	flex-direction: column;
}

.text .subject {
	opacity: 0.5;
}

footer {
	opacity: 0.5;
	display: flex;
	gap: 0.5em;
	padding-left: 1em;
}

footer .reply {
	margin-left: auto;
}

.nested-reply {
	display: block;
	margin-left: 3em;
}


.blanket {
	z-index: 1;
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: var(--drop-down-backdrop, blur(5px));
}

.dropdownmenu {
	padding: 16px;
	position: absolute;
	color: black;
	background: var(--bg-drop-down, white);
	box-shadow: rgb(162 161 183 / 10%) 0px 6px 20px;
	border-radius: 8px;
	top: 52px;
	right: 22px;
	z-index: 2;
	display: grid;
	gap: 1rem;
}

.dropdownmenu > button {
	display: flex;
	align-items: center;
	background: none;
	border: none;
	column-gap: 0.2rem;
}

.dropdownmenu svg {
	width: 1em;
	height: 1em;
}

`
