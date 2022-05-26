import {css} from "lit"
export default css`

.modalview.banuser {}

.modalview.banuser .suspend-user {
	width: 100%;
	max-width: 540px;
	margin: 0 auto;
	padding: 20px;	
	text-align: left;
	border: 1px solid #DDE2E5;
}

.modalview.banuser .heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
}

.modalview.banuser .heading__text {
	display: flex;
}

.modalview.banuser .info {
	width: 20px;
	height: 20px;
	margin-right: 10px;
}

.modalview.banuser .title {
	font-size: 20px;
	font-weight: 700;
	line-height: 24px;
}

.modalview.banuser p {
	font-size: 16px;
	line-height: 24px;
}

.modalview.banuser .gray {
	color: #777E90;
}

.modalview.banuser .name {
	font-weight: bold;
}

.modalview.banuser .border-b {
	padding: 0 0 15px;
	border-bottom: 1px solid #EDEFF5;
}

.modalview.banuser .selection {
	margin: 20px 0;
	display: flex;
	justify-content: space-between;
}

.modalview.banuser .selection > div {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modalview.banuser .selection input {
	margin-right: 5px;
}

.modalview.banuser .action {
	display: flex;
	margin-top: 35px;
}

.modalview.banuser .action button {
	border: none;
	background: transparent;
	color: rgba(255,255,255,0.8);
}

.modalview.banuser .action button:first-child {
	margin-right: 15px;
}

`
