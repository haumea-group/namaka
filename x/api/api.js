import * as renraku from "renraku";
import { makeAdminActionsService } from "./services/v1/admin-actions-service.js";
import { makeCommentReadingService } from "./services/v1/comment-reading-service.js";
import { makeCommentWritingService } from "./services/v1/comment-writing-service.js";
export function makeApi({ policy, ...options }) {
    return renraku.api({
        v1: {
            commentReading: renraku.service()
                .policy(policy)
                .expose(makeCommentReadingService(options)),
            commentWriting: renraku.service()
                .policy(policy)
                .expose(makeCommentWritingService(options)),
            adminActions: renraku.service()
                .policy(policy)
                .expose(makeAdminActionsService(options)),
        },
    });
}
//# sourceMappingURL=api.js.map