
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../types/auth.js"
import {BanParams, UnbanParams} from "../types/concepts.js"
import {enforceValidation} from "./utils/enforce-validation.js"
import {validateBanParams} from "./validators/validate-ban-params.js"
import {validateUnbanParams} from "./validators/validate-admin-unban-params.js"
import {asServiceProvider} from "./utils/as-service-provider.js"

export const makeAdminActionsService = asServiceProvider(({
		database, rando, fetchUsers,
	}) => ({
		user,
	}) => ({

	async banUser(rawData: BanParams): Promise<void> {
		const { userId, until } = enforceValidation(rawData, validateBanParams)
		
		throw new Error("todo implement")
	},

	async unbanUser(rawData: UnbanParams) {
		const data = enforceValidation(rawData, validateUnbanParams)
		const {userId} = data

		throw new Error("todo implement")
	}
}))
