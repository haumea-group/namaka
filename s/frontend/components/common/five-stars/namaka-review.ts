import {renderFiveStarRating,} from './render-five-star-display.js';
import fiveStarRatingCss from './render-five-star-display.css.js';
import {mixinStyles} from '../../../framework/mixins/mixin-styles.js';
import {html, LitElement} from 'lit';
import {FiveStarState} from './render-five-star-display.js';
import {property} from 'lit/decorators.js'
@mixinStyles(fiveStarRatingCss)
export class NamakaReview extends LitElement {
 @property()
	private fiveStarState: FiveStarState = {
		rating: 50,
		clicked: false,
	}

	private setState = (state: FiveStarState) => {
		this.fiveStarState = state
	}

	render() {
	return html`
			<p>demo five star</p>
			${renderFiveStarRating(this.fiveStarState, this.setState)}
		`
	}
}
