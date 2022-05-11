
import * as dbmage from "dbmage"
import * as renraku from "renraku"
import * as express from "express"
import {makeRequestListener} from "renraku/x/http/node-utils/make-request-listener.js"

import {makeApi} from "./api.js"
import {AppDatabase} from "./types/schema.js"
import {User, UserIntegration} from "./types/auth.js"

export {Id} from "dbmage"
export {megabytes} from "renraku"

export async function expressMiddleware({
		exposeErrors, maxPayloadSize,
		database, authUser, fetchUsers,
	}: {
		database: AppDatabase
		exposeErrors: boolean
		maxPayloadSize: number
		authUser: (req: express.Request) => Promise<undefined | UserIntegration>
		fetchUsers: (userIds: dbmage.Id[]) => Promise<UserIntegration[]>
	}) {

	const rando = await dbmage.getRando()

	type Meta = {user: undefined | User}

	const api = makeApi<Meta>({
		rando,
		database,
		fetchUsers,
		policy: async meta => ({
			user: meta.user,
			rando,
			database,
		}),
	})

	const execute = renraku.servelet(api)

	const middleware: express.RequestHandler = async(req, res, next) => {
		const userIntegration = await authUser(req)
		const meta: Meta = {
			user: userIntegration
				? {
					...userIntegration,
					userId: userIntegration.userId.string,
				}
				: undefined,
		}
		const listener = makeRequestListener({
			exposeErrors,
			maxPayloadSize,
			execute: async request => execute({...request, meta}),
		})
		listener(req, res)
		next()
	}

	return {middleware}
}
