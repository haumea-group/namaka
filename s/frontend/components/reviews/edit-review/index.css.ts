import {css} from "lit"
export default css`

.edit-review {
	width: 100%;
	padding: 20px;
	max-width: 710px;
	padding: 30px;
	border: 0.5px solid red;
	border-radius: 25px;
}

.heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title {
	font-size: 18px;
	font-weight: 700;
	line-height: 24px;
}

.close {
	width: 48px;
	height: 48px;
	border-radius: 50%;
	mix-blend-mode: multiply;
	filter: blur(27.1828px);
	display: grid;
}

.close img {
	width: 8px;
	height: 8px;
	margin: auto;
}

.gray {
	color: #718096;
}

.box1 {
	padding-bottom: 15px;
	border-bottom: 1px solid #EDEFF5;
}

.group {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 0;
}

.group > div p:first-child {
	font-weight: 600;
	margin-bottom: 10px;
}

.flex {
	display: flex;
}

.flex img {
	margin-right: 5px;
}

`
