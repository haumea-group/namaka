
import {html, TemplateResult} from "lit"
import {validateCommentBody} from "../../../api/services/validators/validators.js"
import {virtual} from "../../framework/virtual.js"
import {NestedComment} from "../../models/commenting/commenting-types.js"
import {ModalControls} from "../modals/modal-types.js"
import {ValueChangeEvent} from "../namaka-textarea/namaka-textarea.js"
import {virtualFiveStar} from "./virtual-five-star.js"

export interface CommentEditingOptions {
	modals: ModalControls
	scoreAspects:string []
  existingComment: NestedComment
	onSave: (commentDetails: object) => void
}

export interface CommentAuthoringOptions {
  isAReview: boolean
  parentCommentId: undefined | string
	modals: ModalControls
	scoreAspects:string []
	onSave: (commentDetails: object) => void
}

export type CommentOptions = CommentEditingOptions | CommentAuthoringOptions

export const virtualEditPostModal = virtual({

	initialState: {
		commentBody: "",
		aspectScores: [],
		isButtonDisabled: true
	},

	setup: (
		{getState, setState},
		details: CommentOptions
	) => {

		let isReply = false
		let isReview = true

		let renderScoringUi: () => TemplateResult | null = () => null

		if((details as CommentEditingOptions).existingComment) {
			// const editing = details as CommentEditingOptions
			const {existingComment, modals, onSave, scoreAspects} = details as CommentEditingOptions
			isReply = !!existingComment.parentCommentId
			isReview = !!existingComment.scoring

			setState({...getState(), commentBody: existingComment.body})

			if (isReview) {
				const {scores} = existingComment.scoring!

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
		}

		else {
			const {isAReview ,modals, parentCommentId, scoreAspects} = details as CommentAuthoringOptions
			isReply = !!parentCommentId
			isReview = isAReview

			if (isReview) {
				const scoringCategories = scoreAspects.map(aspect => ({
					aspect,
					FiveStar: virtualFiveStar.attach({
						component: modals.component,
						state: {
							editable: true,
							rating: 0,
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
		}

		const postType = isReply
		? isReview
			? "review"
			: "thread"
		: "reply"

		function handleTextChange(event: ValueChangeEvent<string>) {
			const {isValid,value} = event.detail
			setState({
				...getState(),
				commentBody: value,
				isButtonDisabled: !isValid
			})
		}

		return (state, props: {closeModal: () => void}) => {

			const {closeModal} = props

			function handleSaveClick() {
				details.onSave(state)
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
						.initial-value="${state.commentBody}"
						@valuechange=${handleTextChange}
						part="textarea"
					></namaka-textarea>
				</div>
				<div class="buttons">
					<button ?disabled=${state.isButtonDisabled} @click=${handleSaveClick}>
						Save
					</button>
					<button
						@click=${closeModal}
					>Cancel</button>
				</div>
			`
		}
	}
})
