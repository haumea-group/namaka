import starSvg from '../../../icons/iconify/star.svg.js';
import { html, render, TemplateResult } from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import './render-five-star-display.css.js';

export function stateBuddy<T>(
	element: HTMLElement,
	initialState: T,
	renderer: (state: T, setState: (s: T) => void) => TemplateResult
) {
	let state: T;
	function setState(newState: T) {
		state = newState;
		render(renderer(state, setState), element);
	}

	setState(initialState);

	return {
		setState,
		get state() {
			return state;
		},
	};
}
interface FiveStarState {
	rating: number;
	clicked: boolean | undefined;
}

export function renderFiveStarRating(
	state: FiveStarState,
	setState: (newState: FiveStarState) => void
) {
	function updateRating(rating: number, e?: Event) {
		const clicked = state.clicked;
		if (e?.type == 'click') {
			let clicked = !state.clicked;
			return setState({ rating, clicked });
		} else {
			return setState({ rating, clicked });
		}
	}
	function renderStar(rating: number) {
		return html` <span
			@mouseover=${() => {
				if (!state.clicked) updateRating(rating);
			}}
			@click=${(e: Event) => updateRating(rating, e)}
			class=${state.rating >= rating ? 'star-full' : 'star-empty'}
			>${starSvg}</span
		>`;
	}
	return html`
		${renderStar(20)}
		${renderStar(40)}
		${renderStar(60)}
		${renderStar(80)}
		${renderStar(100)}
	`;
}
