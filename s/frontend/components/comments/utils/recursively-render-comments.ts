
import {html, TemplateResult} from "lit"
import {NestedComment} from "../../../models/commenting/commenting-types.js"

export function recursivelyRenderComments(
		comments: NestedComment[]
	): TemplateResult {

	return html `
		${comments.map(comment => html`
			<namaka-review-comment
				.authorId="${comment.authorId}"
				.topicId="${comment.topicId}"
				.id="${comment.id}"
				.subject="${comment.subject}"
				.body="${comment.body}"
				.timePosted="${comment.timePosted}">
					<div slot="child-slot">${recursivelyRenderComments(comment.children)}</div>
			</namaka-review-comment>
		`)}
	`
}
