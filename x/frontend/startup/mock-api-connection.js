import * as dbmage from "dbmage";
import * as renraku from "renraku";
import { makeApi } from "../../api/api.js";
import { databaseShape } from "../../api/types/schema.js";
import { randomAvatar, randomNickname } from "../../toolbox/randomly.js";
import { mockUserFetching } from "../models/commenting/testing/mock-user-fetching.js";
export async function mockApiConnection({ snap }) {
    const rando = await dbmage.getRando();
    const database = dbmage.localStorage({ shape: databaseShape });
    const { addUser, fetchUsers } = mockUserFetching(localStorage);
    const api = makeApi({
        rando,
        database,
        scoreAspects: ["a", "b"],
        fetchUsers,
        policy: async (meta) => ({ user: meta.user }),
    });
    const getMeta = async () => ({ user: snap.state.user });
    const remote = renraku.mock()
        .forApi(api)
        .withMetaMap({
        v1: {
            commentReading: getMeta,
            commentWriting: getMeta,
            adminActions: getMeta,
        },
    });
    function mockLogin(permissions) {
        const id = rando.randomId().string;
        const user = {
            permissions,
            id,
            profile: {
                nickname: randomNickname(),
                avatar: randomAvatar(),
                joinedTime: Date.now() * (1000 * 60 * 60),
            },
        };
        addUser(user);
        snap.state.user = user;
    }
    return {
        remote,
        authDevice: {
            async login() {
                mockLogin({
                    canPost: true,
                    canBanUsers: true,
                    canListBanUsers: true,
                    canUnbanUsers: true,
                    canEditAnyComment: true,
                    canArchiveAnyComment: true,
                });
            },
            async logout() {
                snap.state.user = undefined;
            },
            mockLogin,
        },
    };
}
//# sourceMappingURL=mock-api-connection.js.map