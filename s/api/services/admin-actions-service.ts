
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {asServiceProvider} from "./utils/as-service-provider.js"

export const makeAdminActionsService = asServiceProvider(({
		database, rando, fetchUsers,
	}) => ({
		user,
	}) => ({

	async banUser({id, until}: {
			id: string
			until: number
		}): Promise<void> {
		throw new Error("todo implement")
	},

	async unbanUser({id}: {id: string}) {
		throw new Error("todo implement")
	}
}))
