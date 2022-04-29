
import * as dbmage from "dbmage"

import {makeCommentingModel} from "../commenting-model.js"
import {AppSchema, databaseShape} from "../../../../api/types/schema.js"
import {makeCommentingService} from "../../../../api/services/commenting/commenting-service.js"

const rando = await dbmage.getRando()
export const randomId = () => rando.randomId().string

export function newServer() {
	const database = dbmage.memory<AppSchema>({shape: databaseShape})
	return {
		newUser: (userId?: string) => {
			const remote = {
				commenting: makeCommentingService()({rando, database, userId}),
			}
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
