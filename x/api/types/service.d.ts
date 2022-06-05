import * as dbmage from "dbmage";
import * as renraku from "renraku";
import { AppDatabase } from "./schema.js";
import { Auth, UserIntegration } from "./auth.js";
export interface ServiceOptions {
    rando: dbmage.Rando;
    database: AppDatabase;
    scoreAspects: string[];
    fetchUsers: (ids: dbmage.Id[]) => Promise<UserIntegration[]>;
}
export interface ServiceProvider {
    (options: ServiceOptions): (auth: Auth) => renraku.Methods;
}
