
import {html, LitElement} from "lit"
import namakaBoardStatsCss from "./namaka-board-stats.css.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import {mixinStandard} from "../../framework/mixins/mixin-standard.js"
import {makeCommentingModel} from "../../models/commenting/commenting-model.js"
import {makeAuthModel} from "../../models/auth/auth-model.js"
import {property} from "lit/decorators.js"
import {TopicStats} from "../../../api/types/concepts.js"

function ratingToNumberOfStars(rating: number) {
	return (rating / 25) + 1
}

@mixinStyles(namakaBoardStatsCss)
export class NamakaBoardStats extends mixinStandard<{
	auth: ReturnType<typeof makeAuthModel>
	commenting: ReturnType<typeof makeCommentingModel>
}>()(LitElement) {

	@property({type: String})
	topic: string = ""
	
	@property({type: Object})
	stats?: TopicStats

	async firstUpdated() {
		this.stats = await this.context.commenting.getTopicStats(this.topic)
	}
	
	render() {
		return html`
			<div class="review-summary" part="container">
				<!-- <namaka-my-review></namaka-my-review> -->
				<div class="flex-container">
					<div class="wrapper">
						<div>
							<span class="big">
								${ratingToNumberOfStars(this.stats?.scoring?.averageScore || 0)}
							</span>
							<span class="small">/5</span>
						</div>

						<p>Based on 1,321 reviews</p>
					</div>

					<namaka-horizontal-review></namaka-horizontal-review>
				</div>
			</div>
		`
	}
}
