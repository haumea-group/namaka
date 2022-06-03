
import {html, TemplateResult} from "lit"
import {virtual} from "../../framework/virtual.js"

import {NestedComment} from "../../models/commenting/commenting-types.js"
import {validateCommentBody} from "../../../api/services/validators/validators.js"
import {virtualFiveStar} from "./virtual-five-star.js"

import editPostModalViewCss from "../modals/views/edit-thread/edit-post-modal-view.css.js"
import {ModalControls} from "../modals/modal-types.js"
import {ValueChangeEvent} from "../namaka-textarea/namaka-textarea.js"

export const virtualEditPostModal = virtual({

	initialState: {
		commentBody: "",
		aspectScores: {},
		isSaveButtonDisabled: true
	},

	setup: (
		{getState, setState}, {
			comment, scoreAspects, modals, onSave
		} : {
			comment: NestedComment
			scoreAspects:string []
			modals: ModalControls
			onSave: (commentDetails: object) => void
		}) => {

		const isThread = comment.parentCommentId === undefined
		const isReview = comment.scoring !== undefined

		const postType = isThread
		? isReview
			? "review"
			: "thread"
		: "reply"

		let renderScoringUi: () => TemplateResult | null = () => null

		if (isReview) {
			const {scores} = comment.scoring!
		
			function getPreviousOrDefaultScore(aspect: string) {
				const existingScore = scores.find(score => score.aspect === aspect)
				return existingScore
					? existingScore.score
					: 0
			}

			for (const aspect of scoreAspects) {
				setState({...getState(),
					aspectScores: {...getState().aspectScores,[aspect]: getPreviousOrDefaultScore(aspect)}
				})
			}
		
			const scoringCategories = scoreAspects.map(aspect => ({
				aspect,
				FiveStar: virtualFiveStar.attach({
					component: modals.component,
					state: {
						editable: true,
						rating: getPreviousOrDefaultScore(aspect),
					},
				},
				{onRatingChange: (rating) => {
					setState({...getState(),
						aspectScores: {...getState().aspectScores,[aspect]: rating}
					})
				}})
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

		function handleTextChange(event: ValueChangeEvent<string>) {
			const {isValid,value} = event.detail
			setState({
				...getState(),
				commentBody: value,
				isSaveButtonDisabled: !isValid
			})
		}

		return (state, props: {closeModal: () => void}) => {

			const {closeModal} = props

			function handleSaveClick() {
				onSave(state)
				closeModal()
			}

			return html`
				<div class="header">
					<h2>Delete ${postType}</h2>
				</div>
				<div class="body">
					${renderScoringUi()}

					<namaka-textarea
						.validator=${validateCommentBody}
						.initial-value="${comment.body}"
						@valuechange=${handleTextChange}
						part="textarea"
					></namaka-textarea>
				</div>
				<div class="buttons">
					<button ?disabled=${state.isSaveButtonDisabled} @click=${handleSaveClick}>
						Save
					</button>
					<button
						@click=${closeModal}
					>Cancel</button>
				</div>
			`
		}
	},

	styles: editPostModalViewCss
})

