import {css} from "lit"
export default css`

.add-review {
	width: 100%;
	max-width: 700px;
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

.edit-feedback {
	margin-top: 20px;
}

.edit-feedback p {
	margin-bottom: 10px;
}

/* textarea {
	resize: none;
	width: 100%;
	border: 1px solid #DDE2E5;
	margin-top: 10px;
	border-radius: 20px;
	padding: 20px;
	background: transparent;
	color: #fff;
}

textarea:focus {
	outline: none;
} */

button {
	border: none;
	margin-top: 30px;
	padding: 5px;
}

`
