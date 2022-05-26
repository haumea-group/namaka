
import {html, TemplateResult} from "lit"
import {ModalControls} from "../../modal-types.js"
import {NestedComment} from "../../../../models/commenting/commenting-types.js"
import {validateCommentBody} from "../../../../../api/services/validators/validators.js"
import {virtualFiveStar} from "../../../virtual/virtual-five-star.js"

const defaultScore = 0

export async function editPostModalView({
		modals,
		comment,
		scoreAspects,
	}: {
		modals: ModalControls
		comment: NestedComment
		scoreAspects: string[]
	}) {

	const isThread = comment.parentCommentId === undefined
	const isReview = comment.scoring !== undefined

	let renderScoringUi: () => TemplateResult | null = () => null

	if (isReview) {
		const {scores} = comment.scoring!

		function getPreviousOrDefaultScore(aspect: string) {
			const existingScore = scores.find(score => score.aspect === aspect)
			return existingScore
				? existingScore.score
				: defaultScore
		}

		const scoringCategories = scoreAspects.map(aspect => ({
			aspect,
			FiveStar: virtualFiveStar.attach({
				component: modals.component,
				state: {
					editable: true,
					rating: getPreviousOrDefaultScore(aspect),
				},
			})
		}))

		renderScoringUi = () => html`
			<ol>
				${scoringCategories.map(({aspect, FiveStar}) => html`
					<li>
						<p>${aspect}</p>
						${FiveStar()}
					</li>
				`)}
			</ol>
		`
	}

	const editText = isThread
		? isReview
			? "review"
			: "thread"
		: "reply"

	const result = await modals.confirm({
		closeOnBlanketClick: true,
		renderYes: () => html`Save`,
		renderNo: () => html`Cancel`,
		renderContent: () => html`

			<div class="modalview deletepost">
				<h2>Edit ${editText}</h2>

				${renderScoringUi()}

				<namaka-textarea
					.validator=${validateCommentBody}
					.initial-value="${comment.body}"
					part="textarea"
				></namaka-textarea>
			</div>
		`
	})

	return result
}
