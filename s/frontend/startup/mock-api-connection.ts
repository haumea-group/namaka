
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {makeApi} from "../../api/api.js"
import {AppSnap} from "../models/app-snap.js"
import {AuthDevice} from "../frontend-types.js"
import {MockMeta, Permissions} from "../../api/types/auth.js"
import {AppRemote} from "../../api/types/remote.js"
import {databaseShape} from "../../api/types/schema.js"

export async function mockApiConnection({snap}: {
		snap: AppSnap
	}): Promise<{
		remote: AppRemote
		authDevice: AuthDevice
	}> {

	const rando = await dbmage.getRando()
	const database = dbmage.localStorage({shape: databaseShape})

	const api = makeApi<MockMeta>({
		policy: async meta => ({
			user: meta.user,
			rando,
			database,
		}),
	})

	const getMeta = async() => (<MockMeta>{user: snap.state.user})

	const remote = renraku.mock()
		.forApi(api)
		.withMetaMap({
			commentReading: getMeta,
			commentWriting: getMeta,
			adminActions: getMeta,
		})

	function mockLogin(permissions: Permissions) {
		const id = rando.randomId().string
		snap.state.user = {
			permissions,
			userId: rando.randomId().string,
			profile: {
				nickname: "Francesca" + id.slice(0, 5),
				avatar: "",
				joinedTime: Date.now() * (1000 * 60 * 60),
			},
		}
	}

	return {
		remote,
		authDevice: {
			async login() {
				mockLogin({
					canPost: true,
					canBanUsers: true,
					canEditAnyComment: true,
					canArchiveAnyComment: true,
				})
			},
			async logout() {
				snap.state.user = undefined
			},
			mockLogin,
		},
	}
}
