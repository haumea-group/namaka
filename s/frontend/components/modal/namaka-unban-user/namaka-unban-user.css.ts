import {css} from "lit"
export default css`

.ban-user {
	width: 100%;
	max-width: 540px;
	margin: 0 auto;
	padding: 20px;
	border: 0.5px solid #776e62;
	text-align: left;
}

.heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
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

.close {
	width: 30px;
	height: 30px;
	background-color: #fff;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.5px solid rgba(0,0,0,0.1);
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
	padding: 5px;
}

.action button:first-child {
	margin-right: 15px;
}

`
