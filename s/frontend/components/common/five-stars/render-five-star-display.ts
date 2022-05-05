import starSvg from '../../../icons/iconify/star.svg.js';
import {html, render, TemplateResult} from 'lit';
import './render-five-star-display.css.js';

		export	function stateBuddy<T>(
			element: HTMLElement,
			initialState: T,
			renderer: (
				state: T,
				setState: (s: T) => void,
			) => TemplateResult,
		) {
			let state: T
		function setState(newState: T) {
				state = newState
				render(renderer(state, setState), element)
			}

			setState(initialState)

		return {
				setState,
				get state() {return state},
			}
		}
interface FiveStarState {
  rating: number
}

export function renderFiveStarRating(state: FiveStarState,
    setState: (newState: FiveStarState) => void) {
	
	function updateRating(rating: number) {
		return setState({rating})
	}
	
	return html`
		<div class="five-star">
			<span @mouseover=${() => updateRating(20)} @click=${() => updateRating(20)} class=${state.rating >= 20 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span @mouseover=${() => updateRating(40)} @click=${() => updateRating(40)} class=${state.rating >= 40 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span @mouseover=${() => updateRating(60)} @click=${() => updateRating(60)} class=${state.rating >= 60 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span @mouseover=${() => updateRating(80)} @click=${() => updateRating(80)} class=${state.rating >= 80 ? "star-full" : "star-empty"}>${starSvg}</span>
			<span @mouseover=${() => updateRating(100)} @click=${() => updateRating(100)} class=${state.rating >= 100 ? "star-full" : "star-empty"}>${starSvg}</span>
		</div>
	`;
}
