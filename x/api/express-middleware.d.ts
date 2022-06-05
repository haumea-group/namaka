/// <reference types="qs" />
import * as dbmage from "dbmage";
import * as express from "express";
import { AppDatabase } from "./types/schema.js";
import { User, UserIntegration } from "./types/auth.js";
export { Id } from "dbmage";
export { megabytes } from "renraku";
export declare function expressMiddleware({ exposeErrors, maxPayloadSize, scoreAspects, database, authUser, fetchUsers, }: {
    database: AppDatabase;
    exposeErrors: boolean;
    maxPayloadSize: number;
    scoreAspects: string[];
    canUserPostToTopic: (user: User, topicId: dbmage.Id) => Promise<boolean>;
    authUser: (req: express.Request) => Promise<undefined | UserIntegration>;
    fetchUsers: (ids: dbmage.Id[]) => Promise<UserIntegration[]>;
}): Promise<{
    middleware: express.RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}>;
