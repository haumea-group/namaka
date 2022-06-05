
import {css, html} from "lit"
import {virtual} from "../../framework/virtual.js"
import starSvg from "../../../icons/akar/star.svg.js"

export const virtualFiveStar = virtual({

	initialState: {
		rating: 100,
		editable: false,
	},

	setup({getState, setState}, details: void) {

		function updateRating(newRating: number) {
			setState({...getState(), rating: newRating})
		}

		function renderStar(treshhold: number) {
			const handleClick = () => {
				if (getState().editable)
					updateRating(treshhold)
			}
			const className = getState().rating >= treshhold
				? "star-full"
				: "star-empty"
			return html`
				<span
					@click=${handleClick}
					class=${className}>
						${starSvg}
				</span>
			`
		}

		return (state, props: void) => html`
			<div class=five-star>
				${renderStar(0)}
				${renderStar(20)}
				${renderStar(40)}
				${renderStar(60)}
				${renderStar(80)}
			</div>
		`
	},

	styles: css`
		.five-star {
			display: flex;
			align-items: center;
		}

		.five-star > * {
			display: flex;
			align-items: center;
		}

		.five-star svg {
			width: var(--five-star-size, 1em);
			height: var(--five-star-size, 1em);
		}
		
		.five-star .star-full svg path {
			fill: yellow;
			stroke: yellow;
		}
		
		.five-star .star-empty svg path {
			fill: none;
		}
	`,
})
