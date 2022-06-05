import { css } from "lit";
export default css `

.board {
	border: 1px solid rgb(221, 226, 229);
	border-radius: 1rem;
	padding: 1rem;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgb(221, 226, 229);
	padding-bottom: 0.5rem;
}

select {
	padding: 0.4rem 0.625rem;
}

button {
	padding: 0.625rem 0.8rem;
	margin: 0.5rem auto;
}

button:hover, select:hover {
	cursor: pointer;
}

.box {
	width: 100%;
	max-width: 300px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1rem auto;
	padding: 1.5rem 0;
	text-align-center;
}

`;
//# sourceMappingURL=namaka-board-wip.css.js.map