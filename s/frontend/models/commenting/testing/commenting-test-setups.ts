
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {makeApi} from "../../../../api/api.js"
import {AppRemote} from "../../../../api/types/remote.js"
import {makeCommentingModel} from "../commenting-model.js"
import {MockMeta, User} from "../../../../api/types/auth.js"
import {AppSchema, databaseShape} from "../../../../api/types/schema.js"

const rando = await dbmage.getRando()
export const randomId = () => rando.randomId().string

export function newServer() {
	const database = dbmage.memory<AppSchema>({shape: databaseShape})
	return {
		newUser: (user?: User) => {
			const getAuth = async() => ({rando, database, user})
			const remote = <AppRemote>renraku.mock()
				.forApi(makeApi<MockMeta>({policy: async() => {throw new Error("nope")}}))
				.withAuthMap({
					commentReading: getAuth,
					commentWriting: getAuth,
					adminActions: getAuth,
				})
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
			get commentTree() {
				return commenting.snap.readable.commentTree
			},
		},
	}
}
