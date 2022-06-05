import * as renraku from "renraku";
import { makeApi } from "../api.js";
export declare type AppApi = ReturnType<typeof makeApi>;
export declare type AppRemote = renraku.Remote<AppApi>;
