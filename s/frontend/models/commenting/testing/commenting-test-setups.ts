
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {MockMeta, User} from "../../../../api/types/auth.js"
import {makeCommentingModel} from "../commenting-model.js"
import {AppSchema, databaseShape} from "../../../../api/types/schema.js"
// import {makeCommentingService} from "../../../../api/services/commenting/commenting-service.js"
import {makeApi} from "../../../../api/api.js"
import {AppRemote} from "../../../../api/types/remote.js"

const rando = await dbmage.getRando()
export const randomId = () => rando.randomId().string

export function newServer() {
	const database = dbmage.memory<AppSchema>({shape: databaseShape})
	return {
		newUser: (user?: User) => {
			const remote = <AppRemote>renraku.mock()
				.forApi(makeApi<MockMeta>({policy: async() => {throw new Error("nope")}}))
				.withAuthMap({
					commenting: async() => ({rando, database, user})
				})
			// const remote = {
			// 	commenting: makeCommentingService()({rando, database, user}),
			// }
			return {
				newBrowserTab: () => {
					const commenting = makeCommentingModel({remote})
					return withTestingHelpers(commenting)
				}
			}
		}
	}
}

function withTestingHelpers(commenting: ReturnType<typeof makeCommentingModel>) {
	return {
		commenting,
		helpers: {
			get allComments() {
				return commenting.snap.readable.allComments
			},
		},
	}
}
