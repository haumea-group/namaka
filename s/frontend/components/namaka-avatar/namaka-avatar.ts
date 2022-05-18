import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {html, LitElement} from "lit"
import namakaAvatarCss from './namaka-avatar.css.js'
import {property} from "lit/decorators.js"
import {User} from "../../../api/types/auth.js"

@mixinStyles(namakaAvatarCss)
export class NamakaAvatar extends LitElement {
  
	@property({type: Object})
    user?: User
	
	render(){
		return this.user
			? html`<div><img src="${this.user.profile.avatar}" alt=""/></div>`
			: null
	}
}
