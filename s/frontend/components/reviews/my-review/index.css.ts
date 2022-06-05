import {css} from "lit"
export default css`

.container {
	display: flex;
	justify-content: center;
	border-bottom: 0.5px solid #EDEFF5;
	padding: 20px;
}

img {
	width:50px;
	height:50px;
	border-radius:50%;
}

@media screen and (min-width: 768px) {
	.container {
		display: block;
		border-bottom: none;
		padding: 0;
	}

	.review-summary {
		/* max-width: 768px; */
		border-bottom: none;
		border-right: 0.5px solid #EDEFF5;
	}
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
