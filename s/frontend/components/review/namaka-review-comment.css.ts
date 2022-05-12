
import {css} from "lit"
export default css`

:host {
	display: block;
	width: 100%;
	max-width: 62.75rem;
	border-top: 1px solid #EDEFF5;
	position: relative;
	text-align:left;
}

li span {
	position: relative;
	left: -8px;
}

button:hover {
	cursor: pointer;
}

.outer-div {
	padding: 2rem 1rem;
	display: flex;
	gap: 1.5rem;
	gap: calc(0.7rem + 1vw);
}

.avatar {
	min-width: 48px;
	aspect-ratio: 1;
	background-color: lightgrey;
	border-radius: 48px;
	align-self: flex-start;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.header__txt {
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
}

.header__txt > p {
	margin-right: 0.5rem;
}


.header__btn {
	display: flex;
	align-items: center;
	padding-top: 0.3rem;
	gap:0.5rem;
}

.drop-down__btn {
	width: 23px;
	height: 11px;
	border-radius: 40px;
	border: none;
	display: grid;
	align-content: center;
	z-index: 2;
}

.inner-div {
	width: 100%;
}

.inner-div > p {
	opacity: 0.8;
	margin-top: 0.2em;
}

.footer {
	display: flex;
	gap: 1rem;
	margin-top: 0.5rem;
}

.time-stamp {
	opacity: 0.5;
}

.footer li, .footer button {
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 20px;
}

.blanket {
	position: fixed;
	inset: 0px;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
	backdrop-filter: var(--drop-down-backdrop, blur(5px));
}

.drop-down {
	padding: 16px;
	position: absolute;
	background: var(--bg-drop-down, white);
	box-shadow: rgb(162 161 183 / 10%) 0px 6px 20px;
	border-radius: 8px;
	top: 52px;
	right: 22px;
	z-index: 2;
	display: grid;
	gap: 1rem;
}

.drop-down > button {
	display: flex;
	align-items: center;
	background: none;
	border: none;
	column-gap: 0.2rem;
}

 svg {
	width: 14px;
	height: 14px;
}
`
