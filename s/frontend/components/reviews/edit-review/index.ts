import {html, LitElement} from "lit"
import closeIconSvg from "../../../../icons/iconify/close-icon.svg.js"
import starSvg from "../../../../icons/iconify/star.svg.js"
import {mixinStyles} from "../../../framework/mixins/mixin-styles.js"
import namakaEditReviewCss from "./index.css.js"

@mixinStyles(namakaEditReviewCss)
export class NamakaEditReview extends LitElement {
    render() {
        return html`
            <div class="edit-review">
                <div class="box1">
                    <div class="heading">
                        <span class="title">Edit Review</span>
                        <div class="close">${closeIconSvg}</div>
                    </div>
                    <p class="gray">Share your experience with the ValorExchange community, to help make better decisions</p>
                </div>
                <div class="share">
                    <div class="group">
                        <div>
                            <p>Share Review?</p>
                            <p>Please choose a review to rate this particular user.</p>
                        </div>
                        <div class="flex">
                            ${starSvg}
                            ${starSvg}
                            ${starSvg}
                            ${starSvg}
                            ${starSvg}
                        </div>
                    </div>
                    <div class="edit-feedback">
                        <p><span class="black">Edit your feedback to this user</span> <span class="gray">(This will be made public)</span></p>
                    </div>
                </div>
            </div>
        `
    }
}
