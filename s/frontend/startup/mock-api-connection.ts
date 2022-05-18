import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {makeApi} from "../../api/api.js"
import {AppSnap} from "../models/app-snap.js"
import {AuthDevice} from "../frontend-types.js"
import {AppRemote} from "../../api/types/remote.js"
import {databaseShape} from "../../api/types/schema.js"
import {randomAvatar, randomNickname} from "../../toolbox/randomly.js"
import {MockMeta, Permissions, User} from "../../api/types/auth.js"
import {mockUserFetching} from "../models/commenting/testing/mock-user-fetching.js"

export async function mockApiConnection({snap}: {
		snap: AppSnap
	}): Promise<{
		remote: AppRemote
		authDevice: AuthDevice
	}> {

	const rando = await dbmage.getRando()
	const database = dbmage.localStorage({shape: databaseShape})
	const {addUser, fetchUsers} = mockUserFetching(localStorage)

	const api = makeApi<MockMeta>({
		rando,
		database,
		scoreAspects: ["a", "b"],
		fetchUsers,
		policy: async meta => ({user: meta.user}),
	})

	const getMeta = async() => (<MockMeta>{user: snap.state.user})

	const remote = renraku.mock()
		.forApi(api)
		.withMetaMap({
			v1	:{
				commentReading: getMeta,
				commentWriting: getMeta,
				adminActions: getMeta,
			},
		})

	function mockLogin(permissions: Permissions) {
		const id = rando.randomId().string
		const user: User = {
			permissions,
			id,
			profile: {
				nickname: randomNickname(),
				avatar: randomAvatar(),
				joinedTime: Date.now() * (1000 * 60 * 60),
			},
		}
		addUser(user)
		snap.state.user = user
	}

	return {
		remote,
		authDevice: {
			async login() {
				mockLogin({
					canPost: true,
					canBanUsers: true,
					canListBanUsers: true,
					canUnbanUsers: true,
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
