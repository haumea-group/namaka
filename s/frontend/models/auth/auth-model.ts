
import {AppSnap} from "../app-snap.js"
import {AuthDevice} from "../../frontend-types.js"

export function makeAuthModel({snap: {readable}, authDevice}: {
		snap: AppSnap
		authDevice: AuthDevice
	}) {

	return {
		get user() {
			return readable.user
		},
		async login() {
			await authDevice.login()
		},
		async logout() {
			await authDevice.logout()
		},
		mockLogins: {
			regular: () => authDevice.mockLogin({
				canPost: true,
				canBanUsers: false,
				canEditAnyComment: false,
				canArchiveAnyComment: false,
			}),
			admin: () => authDevice.mockLogin({
				canPost: true,
				canBanUsers: true,
				canEditAnyComment: true,
				canArchiveAnyComment: true,
			}),
		},
	}
}
