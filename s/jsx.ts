
import {NamakaModals} from "./frontend/components/modals/namaka-modals.js"
import {NamakaBannedUsers} from "./frontend/components/banned-users/index.js"
import {NamakaComments} from "./frontend/components/comments/namaka-comments.js"
import {NamakaDemoAuth} from "./frontend/components/demo-auth/namaka-demo-auth.js"
import {NamakaReview} from "./frontend/components/common/five-stars/namaka-review.js"
import {NamakaTextarea} from "./frontend/components/namaka-textarea/namaka-textarea.js"

export declare module JSX {
	interface IntrinsicElements {
		"namaka-banned-users": NamakaBannedUsers
		"namaka-comments": NamakaComments
		"namaka-demo-auth": NamakaDemoAuth
		"namaka-modals": NamakaModals
		"namaka-textarea": NamakaTextarea
		"namaka-review": NamakaReview
	}
}
