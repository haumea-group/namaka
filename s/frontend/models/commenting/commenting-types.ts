
import {User} from "../../../api/types/auth.js"
import {CommentPost} from "../../../api/types/concepts.js"

export interface CommentTree extends CommentPost {
	children: CommentTree[]
}

export interface CommentingState {
	user?: User
	commentTree: CommentTree[]
}
