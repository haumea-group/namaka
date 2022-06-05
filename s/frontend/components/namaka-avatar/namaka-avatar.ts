
import {html, LitElement} from "lit"

import {property} from "lit/decorators.js"
import {User} from "../../../api/types/auth.js"
import namakaAvatarCss from './namaka-avatar.css.js'
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"

@mixinStyles(namakaAvatarCss)
export class NamakaAvatar extends LitElement {

	@property({type: Object})
	user?: User
	
	render(){
		return this.user
			? html`<img part=img src="${this.user.profile.avatar}" alt=""/>`
			: null
	}
}
