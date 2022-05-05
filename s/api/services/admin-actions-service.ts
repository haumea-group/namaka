
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../types/auth.js"

export const makeAdminActionsService = () => ({
		user, rando, database,
	}: Auth) => ({

	async banUser({userId, until}: {
			userId: string
			until: number
		}): Promise<void> {
		throw new Error("todo implement")
	},

	async unbanUser({userId}: {userId: string}) {
		throw new Error("todo implement")
	}
})
