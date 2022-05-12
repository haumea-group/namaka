import {css} from "lit"
export default css`

.suspend-user {
	width: 100%;
	max-width: 540px;
	margin: 0 auto;
	padding: 20px;	
	text-align: left;
	border: 1px solid #DDE2E5;
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

.title {
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

.name {
	font-weight: bold;
}

.border-b {
	padding: 0 0 15px;
	border-bottom: 1px solid #EDEFF5;
}

.selection {
	margin: 20px 0;
	display: flex;
	justify-content: space-between;
}

.selection > div {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.selection input {
	margin-right: 5px;
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
