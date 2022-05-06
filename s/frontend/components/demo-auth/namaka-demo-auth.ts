
import {html, LitElement} from "lit"

import namakaDemoAuthCss from "./namaka-demo-auth.css.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {makeAuthModel} from "../../models/auth/auth-model.js"

@mixinStyles(namakaDemoAuthCss)
export class NamakaDemoAuth extends mixinStandard<{
		auth: ReturnType<typeof makeAuthModel>
	}>()(LitElement) {

	render() {
		const {auth} = this.context
		const isLoggedIn = !!auth.user
		return html`

			<button
				?disabled=${isLoggedIn}
				@click=${auth.login}>
					login
			</button>

			<button
				?disabled=${!isLoggedIn}
				@click=${auth.logout}>
					logout
			</button>

			${auth.user
				? html`<p>logged in: ${auth.user.userId.slice(0, 7)}</p>`
				: html`<p>logged out</p>`}
		`
	}
}
