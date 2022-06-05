
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {Auth, User} from "../../types/auth.js"
import { Ban, BanParams, UnbanParams, ListBansParams, FetchBanParams } from "../../types/concepts.js"
import {enforceValidation} from "../utils/enforce-validation.js";
import {rowsToBans} from "../utils/row-to-bans.js"
import {newBanRow} from "../utils/new-ban-row.js"
import {validateBanParams} from "../validators/validate-ban-params.js"
import {validateUnbanParams} from "../validators/validate-admin-unban-params.js"
import {validateListBans} from "../validators/validate-list-bans-params.js"
import {validateFetchBanParams} from "../validators/validate-fetch-ban-params.js"
import {asServiceProvider} from "../utils/as-service-provider.js"
import {find} from "dbmage"

export const makeAdminActionsService = asServiceProvider(({
		database, rando, fetchUsers,
	}) => ({
		user,
	}) => ({

	async banUser(rawData: BanParams): Promise<void> {
		const draft = enforceValidation(rawData, validateBanParams)

		if (!user)
			throw new renraku.ApiError(403, "cannot ban user, not logged in")

		if (!user.permissions.canBanUsers)
			throw new renraku.ApiError(403, "you are not permitted to ban user")

		const banRow = newBanRow({
			userId: draft.userId,
			banDrafts: [draft]
		})
		await database.tables.bans.create(...banRow)
	},
	
	async unbanUser(rawData: UnbanParams): Promise<void> {
		const {userId} = enforceValidation(rawData, validateUnbanParams)

		const bannedUser = await database.tables.bans.readOne(find({userId: dbmage.Id.fromString(userId)}))
		
		if (!user)
			throw new renraku.ApiError(403, "cannot unban user, not logged in")

		if (!bannedUser)
			throw new renraku.ApiError(404, "cannot unban, user not found")

		if (!user.permissions.canUnbanUsers)
			throw new renraku.ApiError(403, "you are not permitted to unban user")

		 await database.tables.bans.delete(find({userId: dbmage.Id.fromString(userId)}))
	},

	async listBans(rawData: ListBansParams): Promise<{
			bans: Ban[]
			users: User[]
		}> {

		const {limit, offset} = enforceValidation(rawData, validateListBans)

		if (!user)
			throw new renraku.ApiError(403, "cannot view banned users, not logged in")

		if (!user?.permissions.canListBanUsers)
			throw new renraku.ApiError(403, "you are not permitted to view banned users")

		const banRows = await database.tables.bans.read({
			conditions: false,
			offset,
			order: {until: "descend"},
			limit: limit > 50
				? 50
				: limit,
		})	

		if (banRows.length === 0)
		return {
			users: [],
			bans: [],
		}

		const userIds = new Map<string, dbmage.Id>()
		for (const {userId} of banRows)
			userIds.set(userId.string, userId)

		const users = (await fetchUsers([...userIds.values()]))
		.map(user => (<User>{
			id: user.id.string,
			permissions: user.permissions,
			profile: user.profile,
		}))

		const bans = banRows.map(rowsToBans)

		 return {bans, users}
	},

	async fetchBan(rawData: FetchBanParams): Promise<{
			ban: Ban
			_user: User[]
		}> {
			const {userId} = enforceValidation(rawData, validateFetchBanParams)

			if (!user)
				throw new renraku.ApiError(403, "cannot view user ban information, not logged in")
	
			const userBanned = await database.tables.bans.readOne(find({userId: dbmage.Id.fromString(userId)}))
	
			if (!userBanned)
				throw new renraku.ApiError(404, "user not found in bans table")
	
			const _userId = new Map<string, dbmage.Id>()
			for (const {userId} of [userBanned])
				_userId.set(userId.string, userId)
	
			const _user = (await fetchUsers([..._userId.values()]))
				.map(user => (<User>{
					id: user.id.string,
					permissions: user.permissions,
					profile: user.profile,
				}))
	
			const ban = rowsToBans(userBanned)
	
			return {ban, _user}
	},
}))
