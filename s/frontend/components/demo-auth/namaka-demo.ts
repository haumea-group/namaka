
import {html, LitElement} from "lit"

import {ModalControls} from "../modals/modal-types.js"
import {makeAuthModel} from "../../models/auth/auth-model.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"

import NamakaDemoCss from "./namaka-demo.css.js"

@mixinStyles(NamakaDemoCss)
export class NamakaDemo extends mixinStandard<{
		auth: ReturnType<typeof makeAuthModel>
		modals: ModalControls
	}>()(LitElement) {

	#modalTestCount = 0

	#modalTestConfirm = async() => {
		const n = this.#modalTestCount++
		const result = await this.context.modals.confirm({
			renderContent: () => html`
				<h2>modal confirm #${n}</h2>
				<p>this is a test of the modal system.</p>
				<button @click=${this.#modalTestConfirm}>spawn nested modal</button>
			`,
		})
		console.log("modal", n, "returned", result)
	}

	render() {
		const {auth} = this.context
		const isLoggedIn = !!auth.user
		const isAdmin = !!auth.user?.permissions.canArchiveAnyComment
		return html`

			<button
				?disabled=${isLoggedIn}
				@click=${auth.mockLogins.regular}>
					login (regular)
			</button>

			<button
				?disabled=${isLoggedIn}
				@click=${auth.mockLogins.admin}>
					login (admin)
			</button>

			<button
				?disabled=${!isLoggedIn}
				@click=${auth.logout}>
					logout
			</button>

			${auth.user
				? html`
					<p>
						logged in:
						${auth.user.id.slice(0, 7)}
						${isAdmin ?"(admin)" :null}
						"${auth.user.profile.nickname}"
					</p>
				`
				: html`<p>logged out</p>`}

			<button
				@click=${this.#modalTestConfirm}>
					test modal
			</button>
		`
	}
}
