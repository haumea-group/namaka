
import {html, TemplateResult} from "lit"
import {virtual} from "../../framework/virtual.js"

import {NestedComment} from "../../models/commenting/commenting-types.js"
import {validateCommentBody} from "../../../api/services/validators/validators.js"
import {virtualFiveStar} from "./virtual-five-star.js"

import editPostModalViewCss from "../modals/views/edit-thread/edit-post-modal-view.css.js"
import {ModalControls} from "../modals/modal-types.js"

const defaultScore = 0

export const virtualEditPostModal = virtual({

	initialState: {
		choice: "one",
		
	},

	setup: (
		{getState, setState}) => {

		const setChoice = (event: Event) => {
			const input = event.target as HTMLInputElement
			setState({
				choice: input.value,
				
			})
		}

		const handleCancelClick = () => {
			setState({...getState(), choice: ""})
		}

		return (
			state,
			props: {
				closeModal: () => void,
				comment: NestedComment,
				scoreAspects:string [],
				modals: ModalControls
			}) => {
				const {modals, closeModal, comment, scoreAspects} = props
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

				return html`
					<div class="header">
						<h2>Delete ${editText}</h2>
					</div>
					<div class="body">
						${renderScoringUi()}

						<namaka-textarea
							.validator=${validateCommentBody}
							.initial-value="${comment.body}"
							part="textarea"
						></namaka-textarea>
					</div>
					
					<div class="buttons">
						<button @click=${closeModal}>
							Save
						</button>
						<button
							@click=${() => {
								handleCancelClick()
								closeModal()
							}}
						>Cancel</button>
					</div>
				`
		}
	},

	styles: editPostModalViewCss
})
