
import {html} from "lit"
import {virtual} from "../../framework/virtual.js"
import {NestedComment} from "../../models/commenting/commenting-types.js"

import xCircleSvg from "../../../icons/feather/x-circle.svg.js"
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js"
import banUserModalViewCss from "../modals/views/ban-user/ban-user-modal-view.css.js"

export const virtualBanUserModal = virtual({
	initialState: {
		banPeriod: ""
	},

	setup: ({getState, setState}) => {

		const choices = ["24 hrs", "7 days", "indefinitely"]

		const setChoice = (event: Event) => {
			const input = event.target as HTMLInputElement
			setState({
				banPeriod: input.value,
			})
		}

		const handleCancelClick = () => {
			setState({banPeriod: ""})
		}

		return (
			state,
			props: {
				closeModal: () => void,
				comment: NestedComment,
			}) => {

				const {closeModal, comment} = props

				return html`
					<div class="suspend-user" part='container'>
						<div class="border-b">
							<div class="heading">
								<div class="heading__text">
									<div class="info">${alertTriangleSvg}</div>
									<h1 class="title" part="title">
										<slot name="title">Suspend User</slot>	
									</h1>
								</div>
								<div @click=${closeModal()}>${xCircleSvg}</div>
							</div>
							<p class="gray">
								<slot name="text">Are you sure you want to suspend ${comment.user.profile.nickname} from the platform?</slot>	
							</p>
						</div>
		
						<form class="selection">
							${choices.map((choice) => html`
								<div>
									<input
										type="radio"
										name="time"
										value=${choice}
										@change=${setChoice}
									/>
									<label for=${choice} part="label">${choice}</label>
								</div>
							`)}
							<!-- <div>
								<input type="radio" name="time" value="24hrs" />
								<label for="24hrs" part="label">24 hrs</label>
							</div>
							<div>
								<input type="radio" name="time" value="7days" />
								<label for="7days" part="label">7  days</label>
							</div>
							<div>
								<input type="radio" name="time" value="indefinitely" />
								<label for="indefinitely" part="label">Indefinitely</label>
							</div> -->
						</form>
		
						<div class="action">
							<button
								part="dangerBtn button"
								?disabled=${!state.banPeriod}
								@Clic>
								Suspend
							</button>
							<button 
								part="cancelBtn button"
								@click=${() => {
									handleCancelClick()
									close
								}}>
								Cancel
							</button>
						</div>
					</div>
				`
			}
	},

	styles: banUserModalViewCss
})
