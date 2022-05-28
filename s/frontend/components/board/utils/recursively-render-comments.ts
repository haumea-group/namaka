
import {html, TemplateResult} from "lit"
import {NestedComment} from "../../../models/commenting/commenting-types.js"

export function recursivelyRenderComments(
		comments: NestedComment[]
	): TemplateResult {

	return html `
		${comments.map(comment => html`
			<namaka-comment .comment="${comment}">
				${recursivelyRenderComments(comment.children)}
			</namaka-comment>
		`)}
	`
}
