import {html, LitElement} from "lit"
import deleteSvg from "../../../icons/feather/trash2.svg.js"
import searchSvg from "../../../icons/tabler/search.svg.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaLoadMoreCss from "./index.css.js"

@mixinStyles(namakaLoadMoreCss)
export class NamakaBans extends LitElement {
	render() {
		return html`
			<div class="banned-users" part="container">
				<div class="heading top">
					<h1>Banned Users</h1>
					<button part="tag">1,234</button>
				</div>

				<div class="container">
					<div class="heading">
						<div class="search" part="search">
							<div part="icon">
								${searchSvg}
							</div>
							<input type="text" part="text" />
						</div>
						<div class="filter">
							<select name="filter" id="filter" part="filter">
								<option value="name">Name</option>
							</select>
						</div>
					</div>
					
					<div class="overflow">
						<table>
							<thead part="tableHeading">
								<tr>
									<th>User</th>
									<th>Email</th>
									<th>Duration</th>
									<th>Time Remaining</th>
									<th>Date</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div class="user">
											<div class="box">
												<namaka-avatar></namaka-avatar>
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										<div class="delete">
											${deleteSvg}
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="user">
											<div class="box">
												<namaka-avatar></namaka-avatar>
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										<div class="delete">
											${deleteSvg}
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="user">
											<div class="box">
												<namaka-avatar></namaka-avatar>
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										<div class="delete">
											${deleteSvg}
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="user">
											<div class="box">
												<namaka-avatar></namaka-avatar>
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										<div class="delete">
											${deleteSvg}
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					
				</div>
			</div>
        `
    }
}
