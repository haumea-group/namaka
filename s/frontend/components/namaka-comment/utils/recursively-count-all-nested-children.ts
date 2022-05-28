
import {NestedComment} from "../../../models/commenting/commenting-types.js"


export function recursivelyCountAllNestedChildren(comment: NestedComment): number {
	let sum = comment.children.length
	for (const childComment of comment.children)
		sum += recursivelyCountAllNestedChildren(childComment)
	return sum
}
