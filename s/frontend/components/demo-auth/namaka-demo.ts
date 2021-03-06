import {html, LitElement} from "lit"
import {ModalControls} from "../modals/modal-types.js"
import {makeAuthModel} from "../../models/auth/auth-model.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"

import NamakaDemoCss from "./namaka-demo.css.js"

import {ExampleTimer} from "../../framework/magical/examples/example-timer.js"
import {ExampleCounter} from "../../framework/magical/examples/example-counter.js"

@mixinStyles(NamakaDemoCss, ExampleTimer.css)
export class NamakaDemo extends mixinStandard<{
		auth: ReturnType<typeof makeAuthModel>
		modals: ModalControls
		commenting: ReturnType<typeof makeCommentingModel>
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

	#clearLocalStorage = () => {
		window.localStorage.clear()
		this.context.commenting.wipeComments()
	}
	render() {
		const {auth} = this.context
		const isLoggedIn = !!auth.user
		const isAdmin = !!auth.user?.permissions.canArchiveAnyComment
		return html`
			<div>
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
			</div>

			<div>
				<button
					@click=${this.#modalTestConfirm}>
						test modal
				</button>
				<button
					@click=${this.#clearLocalStorage}>
						wipe database
				</button>
			</div>

			${auth.user
				? html`
					<p>
						logged in as
						${isAdmin ?"(admin)" :null}
						"${auth.user.profile.nickname}"
					</p>	
				`
				: html`<p>logged out</p>`}
			
			<br/>

			${ExampleCounter(0)}
			<br/>
			<br/>
			${ExampleTimer()}
		`
	}
}
