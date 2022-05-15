
import {NamakaModals} from "./frontend/components/modals/namaka-modals.js"
import {NamakaBannedUsers} from "./frontend/components/banned-users/index.js"
import {NamakaComments} from "./frontend/components/comments/namaka-comments.js"
import {NamakaDemoAuth} from "./frontend/components/demo-auth/namaka-demo-auth.js"
import {NamakaReview} from "./frontend/components/common/five-stars/namaka-review.js"
import {NamakaTextarea} from "./frontend/components/namaka-textarea/namaka-textarea.js"

type CustomElement<T> = Partial<
	T
	& HTMLElement
	& {children: any}
>

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"namaka-banned-users": CustomElement<NamakaBannedUsers>
			"namaka-comments": CustomElement<NamakaComments>
			"namaka-demo-auth": CustomElement<NamakaDemoAuth>
			"namaka-modals": CustomElement<NamakaModals>
			"namaka-textarea": CustomElement<NamakaTextarea>
			"namaka-review": CustomElement<NamakaReview>
		}
	}
}
