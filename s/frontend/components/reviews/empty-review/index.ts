import {html, LitElement} from "lit"
import noDataSvg from "../../../../icons/iconify/no-data.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaEmptyReviewCss from "./index.css.js"

@mixinStyles(namakaEmptyReviewCss)
export class NamakaEmptyReview extends LitElement {
    render() {
        return html`
            <div class="empty-review">
                <div class="heading">
                    <span class="bold">Reviews</span>
                    <select name="tag" id="tag">
                        <option value="mostRecent">Most Recent</option>
                        <option value="all">All</option>
                    </select>
                </div>

                <div class="box">
                    ${noDataSvg}
                    <p class="gray">You currently don&apos;t have any reviews here. Keep trading and get reviews from other users.</p>
                </div>
            </div>
        `
    }
}
