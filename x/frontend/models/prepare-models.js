import { makeAuthModel } from "./auth/auth-model.js";
import { makeCommentingModel } from "./commenting/commenting-model.js";
export function prepareModels({ snap, remote, authDevice, }) {
    return {
        auth: makeAuthModel({ snap, authDevice }),
        commenting: makeCommentingModel({ state: snap.state, remote }),
    };
}
//# sourceMappingURL=prepare-models.js.map