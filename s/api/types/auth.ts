
import * as dbmage from "dbmage"
import {AppDatabase} from "./schema.js"

export interface BasicMeta {
	userId: string
}

export interface BasicAuth {
	userId: string
	rando: dbmage.Rando
	database: AppDatabase
}
