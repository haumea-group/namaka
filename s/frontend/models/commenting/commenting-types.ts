
import {User} from "../../../api/types/auth.js"
import {CommentPost} from "../../../api/types/concepts.js"

export interface NestedComment extends CommentPost {
	children: NestedComment[]
}
