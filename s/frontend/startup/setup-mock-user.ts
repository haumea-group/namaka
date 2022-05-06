
import * as dbmage from "dbmage"
import {MockMeta} from "../../api/types/auth.js"

export async function setupMockUser() {

	const rando = await dbmage.getRando()
	const userId = rando.randomId().string

	const meta: MockMeta = {
		user: {
			userId,
			profile: {
				nickname: "Jimmy",
				avatar: "fake-image",
				joinedTime: Date.now() - (1000 * 60 * 60),
			},
			permissions: {
				canPost: true,
				canBanUsers: false,
				canEditAnyComment: false,
				canDeleteAnyComment: false,
			},
		}
	}

	const getMockMeta = async() => meta
	return getMockMeta
}
