
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth} from "../types/auth.js"
import {BanUser, UnBanUser} from "../types/concepts.js"
import {enforceValidation} from "./utils/enforce-validation.js"
import {validateAdminBanUser} from "./validators/validateAdminBanUser.js"
import {validateAdminUnBanUser} from "./validators/validateAdminUnbanUser.js"

export const makeAdminActionsService = () => ({
		user, rando, database,
	}: Auth) => ({

	async banUser(rawData: BanUser): Promise<void> {
		const { userId, until } = enforceValidation(rawData, validateAdminBanUser)
		
		throw new Error("todo implement")
	},

	async unbanUser(rawData: UnBanUser) {
		const data = enforceValidation(rawData, validateAdminUnBanUser)
		const {userId} = data

		throw new Error("todo implement")
	}
})
