
import {css} from "lit"
export default css`

.review-summary {
	padding: 20px;
	border: 1px solid #F5F5FA;
	box-shadow: 0px 10px 25px rgba(151, 143, 175, 0.04);
	border-radius: 16px;
	display: flex;
	flex-direction: column;
}

.flex-container .wrapper {
	width: 40%;
}

.flex-container namaka-horizontal-review {
	width: 60%;
}

.flex-container {
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	margin-top: 20px;
}

.wrapper {
	padding: 10px;
}

.wrapper span.big {
	font-size: 2rem;
	line-height: 2.4rem;
	font-weight: 800;
}

.wrapper span.small {
	opacity: 0.8;
}

.wrapper p {
	margin-top: 20px;
	font-weight: 500;
}

@media screen and (min-width: 768px) {
	.review-summary {
		flex-direction: row;
		padding: 30px;
	}
	
	.review-summary namaka-my-review {
		width: 40%;
	}

	.flex-container {
		margin-top: 0;
	}
}

`
