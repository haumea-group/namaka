import starSvg from '../../../icons/iconify/star.svg.js';
import {html} from 'lit';

export function renderFiveStarRating(stars: number) {
	return html`
		<div class="five-star">
			<span class=${stars >= 1 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span class=${stars >= 2 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span class=${stars >= 3 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span class=${stars >= 4 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span class=${stars >= 5 ? "star-full" : "star-empty"}>${starSvg}</span>
		</div>
	`;
}
