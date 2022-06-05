
import {css, html} from "lit"
import {magical} from "../../framework/magical/magical.js"

import starSvg from "../../../icons/akar/star.svg.js"

export const FiveStar = magical(use => ({initialScore, editable}: {
		editable: boolean
		initialScore: number
	}) => {

	const [score, setScore] = use.state(initialScore)

	const handleClickForThreshold = (threshold: number) => () => {
		if (editable)
			setScore(threshold)
	}

	return html`
		<div class=five-star>
			${[0, 20, 40, 60, 80].map(threshold => html`
				<span
					class=star
					?data-on=${score >= threshold}
					@click=${handleClickForThreshold(threshold)}>
						${starSvg}
				</span>
			`)}
		</div>
	`
})

FiveStar.css = css`

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

.five-star .star svg path {
	fill: none;
}

.five-star .star[data-on] svg path {
	fill: yellow;
	stroke: yellow;
}

`
