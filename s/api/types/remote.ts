
import * as renraku from "renraku"

import {makeApi} from "../api.js"

export type AppApi = ReturnType<typeof makeApi>

export type AppRemote = renraku.Remote<AppApi>
