
import {css} from "lit"
export default css`

.board {
	border: 1px solid;
	border-radius: 1rem;
	padding: 1rem;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid;
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

`
