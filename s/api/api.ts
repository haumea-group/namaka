
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {AppDatabase} from "./types/schema.js"
import {BasicAuth, BasicMeta} from "./types/auth.js"
import {makeCommentingService} from "./services/commenting/commenting-service.js"

export async function makeApi({database}: {
		database: AppDatabase
	}) {

	const rando = await dbmage.getRando()

	const basicPolicy: renraku.Policy<BasicMeta, BasicAuth> = async meta => {
		return {
			rando,
			database,
			userId: meta.userId,
		}
	}

	return renraku.api({
		commenting: renraku.service()
			.policy(basicPolicy)
			.expose(makeCommentingService()),
	})
}
