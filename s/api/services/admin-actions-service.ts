
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../types/auth.js"

export const makeAdminActionsService = () => ({
		user, rando, database,
	}: Auth) => ({

	async banUser(userId: string): Promise<void> {
		throw new Error("todo implement")
	},
})
