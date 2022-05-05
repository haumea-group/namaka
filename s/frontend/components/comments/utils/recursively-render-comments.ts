
import {html, TemplateResult} from "lit"
import {CommentTree} from "../../../models/commenting/commenting-types.js"

export function recursivelyRenderComments(
		comments: CommentTree[]
	): TemplateResult {

	return html`
		<ol>
			${comments.map(comment => html`
				<li>
					<p>id: ${comment.id.slice(0, 7)}</p>
					<p>subject: ${comment.subject}</p>
					<p>body: ${comment.body}</p>
					<p>time posted: ${comment.timePosted}</p>
					${comment.children.length
						? html`
							<p>replies:</p>
							${recursivelyRenderComments(comment.children)}
						`
						: null}
				</li>
			`)}
		</ol>
	`
}
