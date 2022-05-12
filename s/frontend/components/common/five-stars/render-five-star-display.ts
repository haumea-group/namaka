import starSvg from '../../../icons/iconify/star.svg.js';
import { html, render, TemplateResult } from 'lit';
import './render-five-star-display.css.js';
export interface FiveStarState {
	rating: number;
}

export function renderFiveStarRating(
	state: FiveStarState,
	setState: (newState: FiveStarState) => void
) {
	function updateRating(rating: number, e?: Event) {
			return setState({ rating });
	}
	function renderStar(rating: number) {
		return html` <span
			@click=${(e: Event) => updateRating(rating, e)}
			class=${state.rating >= rating ? 'star-full' : 'star-empty'}
			>${starSvg}</span
		>`;
	}
	return html`
		<div class="five-star">
			${renderStar(20)}
			${renderStar(40)}
			${renderStar(60)}
			${renderStar(80)}
			${renderStar(100)}
		</div>
	`;
}
