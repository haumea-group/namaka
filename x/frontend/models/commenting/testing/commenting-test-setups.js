import * as dbmage from "dbmage";
import * as renraku from "renraku";
import { makeAppSnap } from "../../app-snap.js";
import { makeApi } from "../../../../api/api.js";
import { mockUserFetching } from "./mock-user-fetching.js";
import { makeCommentingModel } from "../commenting-model.js";
import { databaseShape } from "../../../../api/types/schema.js";
const rando = await dbmage.getRando();
export const randomId = () => rando.randomId().string;
export function newServer() {
    const database = dbmage.memory({ shape: databaseShape });
    const { addUser, fetchUsers } = mockUserFetching();
    return {
        newUser: (user) => {
            if (user)
                addUser(user);
            const getAuth = async () => ({ user });
            const newRemote = renraku.mock()
                .forApi(makeApi({
                policy: async () => { throw new Error("nope"); },
                rando,
                database,
                scoreAspects: ["flavor", "presentation", "service"],
                fetchUsers,
            }))
                .withAuthMap({
                v1: {
                    commentReading: getAuth,
                    commentWriting: getAuth,
                    adminActions: getAuth,
                },
            });
            const remote = {
                commentReading: newRemote["v1"]["commentReading"],
                commentWriting: newRemote["v1"]["commentWriting"]
            };
            return {
                newBrowserTab: () => {
                    const { state } = makeAppSnap();
                    state.user = user;
                    if (user)
                        state.users = [...state.users, user];
                    const commenting = makeCommentingModel({ state, remote });
                    return { commenting };
                }
            };
        }
    };
}
//# sourceMappingURL=commenting-test-setups.js.map