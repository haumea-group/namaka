
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
				.commentCount=${comment.children.length}
				.timePosted="${comment.timePosted}">
					${recursivelyRenderComments(comment.children)}
			</namaka-review-comment>
		`)}
	`
}
