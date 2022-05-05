import {css} from "lit"
export default css`

:host {
	color: #000;
}

.empty-review {
	width: 100%;
	padding: 20px;
	border: 0.5px solid #776e62;
	border-radius: 10px;
}

.heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	border-bottom: 1px solid #EDEFF5;
}

.heading span {
	font-size: 20px;
	line-height: 24px;
	font-weight: 700;
}

select {
	padding: 5px;
	border:  1px solid #EDEFF5;
	color: #676767;
}

.box {
	width: 100%;
	max-width: 300px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1rem auto;
	padding: 1.5rem 0;
	text-align-center;
}

p {
	color: #A0AEC0;
	text-align: center;
}

`
