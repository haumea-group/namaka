
import * as renraku from "renraku"

import {makeApi} from "../api.js"
import {Await} from "../../toolbox/handy-types.js"

export type AppRemote = renraku.Remote<Await<ReturnType<typeof makeApi>>>
