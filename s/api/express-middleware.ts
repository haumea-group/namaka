
import * as dbmage from "dbmage"
import * as renraku from "renraku"
import * as express from "express"
import {makeRequestListener} from "renraku/x/http/node-utils/make-request-listener.js"

import {makeApi} from "./api.js"
import {User} from "./types/auth.js"
import {AppDatabase} from "./types/schema.js"

export {megabytes} from "renraku"

export async function namakaExpress({
		exposeErrors, maxPayloadSize,
		database, authUser, fetchUsers,
	}: {
		database: AppDatabase
		exposeErrors: boolean
		maxPayloadSize: number
		authUser: (req: express.Request) => Promise<User>
		fetchUsers: (userIds: dbmage.Id[]) => Promise<User[]>
	}) {

	const rando = await dbmage.getRando()

	const api = makeApi<{user: User}>({
		policy: async meta => ({
			user: meta.user,
			rando,
			database,
		}),
	})

	const execute = renraku.servelet(api)

	const middleware: express.RequestHandler = async(req, res, next) => {
		const user = await authUser(req)
		const listener = makeRequestListener({
			exposeErrors,
			maxPayloadSize,
			execute: async request => execute({...request, meta: {user}}),
		})
		listener(req, res)
		next()
	}

	return {middleware}
}
