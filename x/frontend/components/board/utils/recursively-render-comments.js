import { html } from "lit";
export function recursivelyRenderComments(comments) {
    return html `
		${comments.map(comment => html `
			<namaka-comment .comment="${comment}">
				${recursivelyRenderComments(comment.children)}
			</namaka-comment>
		`)}
	`;
}
//# sourceMappingURL=recursively-render-comments.js.map