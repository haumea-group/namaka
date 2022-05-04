import {css} from "lit"
export default css`

.review-summary {
	width: 100%;
	padding: 20px;
	max-width: 300px;
	border: 0.5px solid #718096;
	border-radius: 10px;
}

.group {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
}

.group > img {
	margin-right: 20px;
}

#name {
	font-size: 16px;
	line-height: 22.4px;
	font-weight: 600;
	margin-bottom: 7px;
}

.rating svg {
	width: 16px;
	height: 16px;
}

.rating #value {
	font-weight: 600;
	margin: 0 10px;
}

.rating #total {
	color: #718096;
	font-weight: 600;
}

.grid {
	display: grid;
	row-gap: .5em;
}

.flex {
	display: flex;
	align-items: center;
}

.grid .flex svg {
	margin-right: 10px;
}

.gray {
	color: #718096;
}

.black {
	color: #000;
}

`
