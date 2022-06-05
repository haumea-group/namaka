import { css } from "lit";
export default () => css `

.ban-user {
	width: 100%;
	max-width: 540px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid rgb(221, 226, 229);
	text-align: left;
}

.heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
}

.heading__text {
	display: flex;
}

.info {
	width: 20px;
	height: 20px;
	margin-right: 10px;
}

h1 {
	font-size: 20px;
	font-weight: 700;
	line-height: 24px;
}

p {
	font-size: 16px;
	line-height: 24px;
}

.gray {
	color: #777E90;
}

.border-b {
	padding: 0 0 15px;
	border-bottom: 1px solid #EDEFF5;
}

.action {
	display: flex;
	margin-top: 35px;
}

.action button {
	border: none;
	background: transparent;
	color: rgba(255,255,255,0.8);
}

.action button:first-child {
	margin-right: 15px;
}

`;
//# sourceMappingURL=namaka-unban.css.js.map