import {css} from "lit"
export default css`

.add-review {
	width: 100%;
	max-width: 700px;
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

button {
	margin: 0.5rem 0;
}
`
