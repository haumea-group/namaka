
import {AppSnap} from "../app-snap.js"
import {AuthDevice} from "../../frontend-types.js"
import {unproxy} from "@chasemoskal/snapstate"

export function makeAuthModel({snap: {state, readable}, authDevice}: {
		snap: AppSnap
		authDevice: AuthDevice
	}) {

	function addLoggedInUserToUserList() {
		const user = unproxy(state.user)
		if (user)
			state.users = [...state.users, user]
	}

	return {
		get user() {
			return readable.user
		},
		async login() {
			await authDevice.login()
			addLoggedInUserToUserList()
		},
		async logout() {
			await authDevice.logout()
		},
		mockLogins: {
			regular: () => {
				authDevice.mockLogin({
					canPost: true,
					canBanUsers: false,
					canListBanUsers: false,
					canUnbanUsers: false,
					canEditAnyComment: false,
					canArchiveAnyComment: false,
				})
				addLoggedInUserToUserList()
			},
			admin: () => {
				authDevice.mockLogin({
					canPost: true,
					canBanUsers: true,
					canUnbanUsers: true,
					canListBanUsers: true,
					canEditAnyComment: true,
					canArchiveAnyComment: true,
				})
				addLoggedInUserToUserList()
			},
		},
	}
}
