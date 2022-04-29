
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {makeApi} from "../../api/api.js"
import {AppRemote} from "../../api/types/remote.js"
import {BasicMeta} from "../../api/types/auth.js"
import {databaseShape} from "../../api/types/schema.js"

export async function mockApiConnection({getMockMeta}: {
		getMockMeta: () => Promise<BasicMeta>
	}): Promise<AppRemote> {

	const api = await makeApi({
		database: dbmage.localStorage({shape: databaseShape}),
	})

	return renraku.mock()
		.forApi(api)
		.withMetaMap({
			commenting: getMockMeta,
		})
}
