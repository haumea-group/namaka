import { renderFiveStarRating, stateBuddy } from './render-five-star-display.js';
import fiveStarRatingCss from './render-five-star-display.css.js';
import { mixinStyles } from '../../../../namaka.js';
import {html, LitElement} from 'lit';


@mixinStyles(fiveStarRatingCss)
export class NamakaReview extends LitElement {
	render() {
		customElements.whenDefined( 'namaka-review').then( () => {
			let el:HTMLElement = document.querySelector('namaka-review')?.shadowRoot?.querySelector('.test')!
					const fivestar = stateBuddy(
			el,
			{rating: 60},
			renderFiveStarRating,
		)
} )
		return html`
		<div class="test"></div>
		`
	}
	}


