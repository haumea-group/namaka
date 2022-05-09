
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {ServiceProvider} from "../types/service.js"

export const makeAdminActionsService: ServiceProvider = ({
		database, rando, fetchUsers,
	}) => ({
		user,
	}) => ({

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
