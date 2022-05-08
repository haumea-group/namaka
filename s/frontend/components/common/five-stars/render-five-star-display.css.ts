import { css } from 'lit';
export default css`

.five-star {
	display: flex;
	align-content: center;
	align-items: center;
}

svg {
	width: 20px;
}

.star-full svg path {
	fill: yellow;
	stroke: yellow;
}

.star-empty svg path {
	fill: none;
}


`;
