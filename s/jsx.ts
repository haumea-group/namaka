
import {NamakaModals} from "./frontend/components/modals/namaka-modals.js"
import {NamakaBans} from "./frontend/components/banned-users/index.js"
import {NamakaComments} from "./frontend/components/comments/namaka-comments.js"
import {NamakaDemo} from "./frontend/components/demo-auth/namaka-demo.js"
import {NamakaTextarea} from "./frontend/components/namaka-textarea/namaka-textarea.js"

type CustomElement<T> = Partial<
	T
	& HTMLElement
	& {children: any}
>

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"namaka-bans": CustomElement<NamakaBans>
			"namaka-comments": CustomElement<NamakaComments>
			"namaka-demo": CustomElement<NamakaDemo>
			"namaka-modals": CustomElement<NamakaModals>
			"namaka-textarea": CustomElement<NamakaTextarea>
		}
	}
}
