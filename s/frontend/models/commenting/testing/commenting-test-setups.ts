
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {makeApi} from "../../../../api/api.js"
import {AppState, makeAppSnap} from "../../app-snap.js"
import {mockUserFetching} from "./mock-user-fetching.js"
import {AppRemote} from "../../../../api/types/remote.js"
import {makeCommentingModel} from "../commenting-model.js"
import {MockMeta, User} from "../../../../api/types/auth.js"
import {AppSchema, databaseShape} from "../../../../api/types/schema.js"

const rando = await dbmage.getRando()
export const randomId = () => rando.randomId().string

export function newServer() {
	const database = dbmage.memory<AppSchema>({shape: databaseShape})
	const {addUser, fetchUsers} = mockUserFetching()
	return {
		newUser: (user: undefined | User) => {
			if (user)
				addUser(user)
			const getAuth = async() => ({user})
			const remote = <AppRemote>renraku.mock()
				.forApi(makeApi<MockMeta>({
					policy: async() => {throw new Error("nope")},
					rando,
					database,
					scoreAspects: ["a", "b"],
					fetchUsers,
				}))
				.withAuthMap({
					commentReading: getAuth,
					commentWriting: getAuth,
					adminActions: getAuth,
				})
			return {
				newBrowserTab: () => {
					const {state, readable} = makeAppSnap()
					state.user = user
					const commenting = makeCommentingModel({state, remote})
					return withTestingHelpers(readable, commenting)
				}
			}
		}
	}
}

function withTestingHelpers(
		state: AppState,
		commenting: ReturnType<typeof makeCommentingModel>,
	) {
	return {
		commenting,
		helpers: {
			get nestedComments() {
				return state.nestedComments
			},
		},
	}
}
