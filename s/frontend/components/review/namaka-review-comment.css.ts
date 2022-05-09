
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
}

.drop-down__btn {
	width: 23px;
	height: 11px;
	border-radius: 40px;
	border: none;
	display: grid;
	align-content: center;
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

.drop-down {
	padding: 16px;
	position: absolute;
	min-width: 157px;
	/* background: rgb(255, 255, 255); */
	box-shadow: rgb(162 161 183 / 10%) 0px 6px 20px;
	border-radius: 8px;
	top: 52px;
	right: 22px;
	z-index: 1;
	display: grid;
	gap: 1rem;
}

.drop-down > div {
	display: flex;
	align-items: flex-end;
	gap: 0.7rem;
}

 svg {
	width: 14px;
	height: 14px;
}
`
