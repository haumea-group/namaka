
import {css} from "lit"
export default css`

:host {
	display: block;
	max-width: 62.75rem;
	border-top: 1px solid #EDEFF5;
	position: relative;
}

li span {
	position: relative;
	left: -8px;
}

button:hover {
	cursor: pointer;
}

.outer-div {
	padding: 2rem 1.2rem;
	display: flex;
	gap: 1.75rem;
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
}

.header__txt {
	display: flex;
	align-items: center;
	gap: 1rem;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
}

.header__btn {
	display: flex;
	align-items: center;
}

.drop-down__btn {
	width: 23px;
	height: 11px;
	border-radius: 40px;
	border: none;
	display: grid;
	align-content: center;
}

.inner-div > p {
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;
	opacity: 0.8;
}

.footer {
	display: flex;
	gap: 1rem;
	margin-top: 0.5rem;
}

.time-stamp {
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 20px;
	opacity: 0.5;
}

.footer li, .footer button {
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 20px;
}

.footer button, .drop-down button {
	border: none;
	background: none;
}

.drop-down {
	padding: 16px;
	position: absolute;
	min-width: 157px;
	background: rgb(255, 255, 255);
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

.report, .report button {
	color: var(--report-btn-color, #1A202C);
}

.suspend, .suspend button {
	color: var(--suspend-btn-color, #F2994A);
}

.delete, .delete button {
	color: var(--delete-btn-color, #EB0000);
}

.drop-down button {
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
}
`
