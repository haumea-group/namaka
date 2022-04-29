
import * as dbmage from "dbmage"
import {AppDatabase} from "./schema.js"

export interface BasicMeta {
	userId: string | undefined
}

export interface BasicAuth {
	userId: string | undefined
	rando: dbmage.Rando
	database: AppDatabase
}
