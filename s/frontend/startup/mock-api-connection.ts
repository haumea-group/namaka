
import * as dbmage from "dbmage"
import * as renraku from "renraku"

import {makeApi} from "../../api/api.js"
import {MockMeta} from "../../api/types/auth.js"
import {AppRemote} from "../../api/types/remote.js"
import {databaseShape} from "../../api/types/schema.js"

export async function mockApiConnection({getMockMeta}: {
		getMockMeta: () => Promise<MockMeta>
	}): Promise<AppRemote> {

	const rando = await dbmage.getRando()
	const database = dbmage.localStorage({shape: databaseShape})

	const api = makeApi<MockMeta>({
		policy: async meta => ({
			user: meta.user,
			rando,
			database,
		}),
	})

	return renraku.mock()
		.forApi(api)
		.withMetaMap({
			commenting: getMockMeta,
		})
}
