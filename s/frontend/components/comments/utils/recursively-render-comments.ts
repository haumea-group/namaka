
import {html, TemplateResult} from "lit"
import {NestedComment} from "../../../models/commenting/commenting-types.js"

export function recursivelyRenderComments(
		comments: NestedComment[]
	): TemplateResult {

	return html `
		${comments.map(comment => html`
			<namaka-review-comment .comment="${comment}">
				${recursivelyRenderComments(comment.children)}
			</namaka-review-comment>
		`)}
	`
}
