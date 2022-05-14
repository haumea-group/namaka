
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {makeAppSnap} from "../../app-snap.js"
import {makeApi} from "../../../../api/api.js"
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
					const {state} = makeAppSnap()
					state.user = user
					if (user)
						state.users = [...state.users, user]
					const commenting = makeCommentingModel({state, remote})
					return {commenting}
				}
			}
		}
	}
}
