
import * as dbmage from "dbmage"
import * as renraku from "renraku"
import {nodeServer} from "renraku/x/http/node-server.js"

import {makeApi} from "./api/api.js"
import {databaseShape} from "./api/types/schema.js"

nodeServer({
	exposeErrors: false,
	maxPayloadSize: renraku.megabytes(1),
	api: await makeApi({
		database: dbmage.memory({shape: databaseShape}),
	}),
}).listen(8000)
