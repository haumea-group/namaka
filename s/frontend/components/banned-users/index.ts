import {html, LitElement} from "lit"
import deleteSvg from "../../../icons/iconify/delete.svg.js"
import searchSvg from "../../../icons/iconify/search.svg.js"
import {mixinStyles} from "../../framework/mixins/mixin-styles.js"
import namakaLoadMoreCss from "./index.css.js"

@mixinStyles(namakaLoadMoreCss)
export class NamakaBannedUsers extends LitElement {
	render() {
		return html`
			<div class="banned-users">
				<div class="heading top">
					<h1>Banned Users</h1>
					<button>1,234</button>
				</div>

				<div class="container">
					<div class="heading">
						<div class="search">
							${searchSvg}
							<input type="text" />
						</div>
						<div class="filter">
							<select name="filter" id="filter">
								<option value="name">Name</option>
							</select>
						</div>
					</div>
					
					<div class="overflow">
						<table>
							<thead>
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
												<img src="/assets/profile-img.png" alt="Profile Image">
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										${deleteSvg}
									</td>
								</tr>
								<tr>
									<td>
										<div class="user">
											<div class="box">
												<img src="/assets/profile-img.png" alt="Profile Image">
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										${deleteSvg}
									</td>
								</tr>
								<tr>
									<td>
										<div class="user">
											<div class="box">
												<img src="/assets/profile-img.png" alt="Profile Image">
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										${deleteSvg}
									</td>
								</tr>
								<tr>
									<td>
										<div class="user">
											<div class="box">
												<img src="/assets/profile-img.png" alt="Profile Image">
												<p>Fransesca312</p>
											</div>
										</div>
									</td>
									<td>fransesca032@gmail.com</td>
									<td>2 days</td>
									<td>5hr:12mins</td>
									<td>11:42PM, 12th January 2022</td>
									<td>
										${deleteSvg}
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
