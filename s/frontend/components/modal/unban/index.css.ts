import {css} from "lit"
export default css`

.ban-user {
	width: 100%;
	max-width: 540px;
	margin: 0 auto;
	padding: 20px;
	padding: 30px;
	border: 0.5px solid #776e62;
	border-radius: 25px;
	text-align: left;
	background: #fff;
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
	color: #000;
}

p {
	font-size: 16px;
	line-height: 24px;
}

.close {
	width: 48px;
	height: 48px;
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
	color: #000;
	font-weight: bold;
}

.border-b {
	padding: 15px 0;
	border-bottom: 1px solid #EDEFF5;
}

.action {
	display: flex;
	margin-top: 35px;
}

.action button {
	padding: 15px 0;
	width: 100%;
	max-width: 180px;
	border-radius: 40px;
	border: none;
}

.action button.pry {
	background: #FFAF02;
	color: #fff;
	margin-right: 15px;
}

.action button.light {
	background: #FFFAF0;
	color: #FFAF02;
}
`
