import {css} from "lit"
export default css`

/* :host {
	width: 100%;
} */

.banned-users {
	width: 100%;
	overflow-x: auto;
	/* max-width: 400px; */
	/* margin: 0 auto; */
	padding: 20px;
	border: 1px solid #F5F5FA;
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
}

.heading {
	display: flex;
	align-items: center;
}

.top {
	margin-bottom: 20px;
}

.heading h1 {
	margin-right: 20px;
	font-size: 20px;
	line-height: 24px;
}

.container {
	padding: 20px;
	border: 1px solid #fff;
	border-radius: 10px;
}

.container .heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.heading .search {
	display: flex;
	padding: 10px;
	border: 1px solid #fff;
	border-radius: 5px;
}

input {
	background: transparent;
	color: #fff;
	border: none;
}

.heading svg {
	margin-right: 10px;
}

input:focus {
	outline: none;
}

.heading select {
	padding: 10px;
	border-radius: 5px;
	background: transparent;
	color: #fff;
}

.heading button {
	background: #FFAF02;
	color: #fff;
	padding: 10px 8px;
	border-radius: 10px;
	border: none;
}

.overflow {
	max-width: 100%;
	overflow-x: auto;
}

table {
	width: 100%;
	margin-top: 50px;
	border-radius: 8px;
}

table thead {
	background: #F5F8FC;
	color: #000;
	border-radius: 5px;
}

table th {
	padding: 10px;
	text-align: left;
}

table th:first-child {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}

table th:last-child {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

td .box {
	display: flex;
	align-items: center;
}

td {
	padding: 15px 5px;
	border-bottom: 1px solid rgba(255,255,255,0.5);
}

td .box img {
	margin-right: 20px;
	max-width: 38px;
	height: auto;
}

`
