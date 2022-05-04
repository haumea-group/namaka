import { renderFiveStarRating } from './render-five-star-display.js';
import namakaReviewCss from './render-five-star-display.css.js';
import fiveStarRatingCss from './five-star-rating.css.js';
import { mixinStyles } from '../../../../namaka.js';
import { html, LitElement } from 'lit';


@mixinStyles(namakaReviewCss, fiveStarRatingCss)
export class NamakaReview extends LitElement {
	render() {
		return html`
			<div>
			${renderFiveStarRating(2)}
			</div>
		`;
  }
}
