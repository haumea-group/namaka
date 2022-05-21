
import {css} from "lit"
import reportUserModalViewCss from "./report-user/report-user-modal-view.css.js"
import deletePostModalViewCss from "./delete-thread/delete-post-modal-view.css.js"
export default css`

.modalview {
	border: 1px solid currentColor;
	max-width: 42em;
	padding: 1em;
	margin: auto;
}

.modalview > * + * {
	margin-top: 1em;
}

${reportUserModalViewCss}
${deletePostModalViewCss}

`
