
import {css} from "lit"
export default css`

.modalview.report {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	background: #f002;
	text-align: left;
}

h2:first-of-type {
	display: flex;
	gap: 5px;
}

.flex {
	display: flex;
	align-items: center;
	border: 1px solid rgb(182, 181, 181);
	align-items: center;
	cursor: pointer;
}

.btn-close {
	padding: 0.5em;
	border: none;
	background-color: gray;
	cursor: pointer;
	align-self: flex-end;
}

.background {
	display: flex;
	background-color: #e3e3e3;
	padding: 0.5em;
	position: relative;
	font-size: 14px;
}

.copy-container {
	display: flex;
	height: 30px;
	align-items: center;
}

.copy-icon {
	display: flex;
	border: 1px solid rgb(182, 181, 181);
	border-radius: 5px;
	height: 30px;
	width: 30px;
	align-items: center;
	justify-content: center;
	padding: 5px;
}

.check-square {
	display: flex;
	align-items: center;
}

.check-square span {
	margin-right: 5px;
}

.check-square path {
	fill: green;
}


`
