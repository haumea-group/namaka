import * as dbmage from "dbmage";
import * as renraku from "renraku";
import { makeRequestListener } from "renraku/x/http/node-utils/make-request-listener.js";
import { makeApi } from "./api.js";
export { Id } from "dbmage";
export { megabytes } from "renraku";
export async function expressMiddleware({ exposeErrors, maxPayloadSize, scoreAspects, database, authUser, fetchUsers, }) {
    const rando = await dbmage.getRando();
    const api = makeApi({
        rando,
        database,
        scoreAspects,
        fetchUsers,
        policy: async (meta) => ({
            user: meta.user,
            rando,
            database,
        }),
    });
    const execute = renraku.servelet(api);
    const middleware = async (req, res, next) => {
        if (req.url.endsWith("/health")) {
            console.log(`⚕️ health check`);
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.statusCode = 200;
            res.end(Date.now().toString());
        }
        else {
            const userIntegration = await authUser(req);
            const meta = {
                user: userIntegration
                    ? { ...userIntegration, id: userIntegration.id.string }
                    : undefined,
            };
            const listener = makeRequestListener({
                exposeErrors,
                maxPayloadSize,
                execute: async (request) => execute({ ...request, meta }),
            });
            listener(req, res);
            next();
        }
    };
    return { middleware };
}
//# sourceMappingURL=express-middleware.js.map