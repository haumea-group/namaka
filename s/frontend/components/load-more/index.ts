import {html, LitElement} from "lit"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaLoadMoreCss from "./index.css.js"

@mixinStyles(namakaLoadMoreCss)
export class NamakaLoadMore extends LitElement {
	render() {
		return html`
			<div class="load-more">
				<button>Load More</button>
			</div>
        `
    }
}
