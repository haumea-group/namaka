import { css } from "lit";
export default css `

.horizontal-review {
	width: 100%;
	max-width: 800px;
}

.grid {
	display: grid;
	row-gap: .5em;
}

.flex {
	display: flex;
	align-items: center;
}

.line {
	width: 100%;
	max-width: 100%;
	border-radius: 50px;
	background-color: #EDF2F7;;
	position: relative;
	height: 9px;
}

.fill {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 50px;
	background-color: #FFAF02;
}

.w-4 {
	width: 80%;
}

.w-3 {
	width: 60%;
}

.w-2 {
	width: 40%;
}

.w-1 {
	width: 20%;
}

.w-0 {
	width: 0%;
}

span {
	display: block;
	width: 70px;
}

.gray {
	color: #718096;
}

.black {
	color: #000;
}

`;
//# sourceMappingURL=index.css.js.map