
import * as renraku from "renraku"

import {makeApi} from "../api.js"
import {Await} from "../../toolbox/handy-types.js"

export type AppApi = Await<ReturnType<typeof makeApi>>

export type AppRemote = renraku.Remote<AppApi>
