
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
		exposeErrors, maxPayloadSize, scoreAspects, database,
		authUser, fetchUsers,
	}: {
		database: AppDatabase
		exposeErrors: boolean
		maxPayloadSize: number
		scoreAspects: string[]
		canUserPostToTopic: (user: User, topicId: dbmage.Id) => Promise<boolean>
		authUser: (req: express.Request) => Promise<undefined | UserIntegration>
		fetchUsers: (ids: dbmage.Id[]) => Promise<UserIntegration[]>
	}) {

	const rando = await dbmage.getRando()

	type Meta = {user: undefined | User}

	const api = makeApi<Meta>({
		rando,
		database,
		scoreAspects,
		fetchUsers,
		policy: async meta => ({
			user: meta.user,
			rando,
			database,
		}),
	})

	const execute = renraku.servelet(api)

	const middleware: express.RequestHandler = async(req, res, next) => {
		if (req.url.endsWith("/health")) {
			console.log(`⚕️ health check`)
			res.setHeader("Content-Type", "text/plain; charset=utf-8")
			res.statusCode = 200
			res.end(Date.now().toString())
		}
		else {
			const userIntegration = await authUser(req)
			const meta: Meta = {
				user: userIntegration
					? {...userIntegration, id: userIntegration.id.string}
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

	}

	return {middleware}
}
