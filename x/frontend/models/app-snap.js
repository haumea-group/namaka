import { snapstate } from "@chasemoskal/snapstate";
export function makeAppSnap() {
    return snapstate({
        user: undefined,
        users: [],
        comments: {
            scores: [],
            scoreAspects: [],
            allComments: [],
            nestedComments: [],
        },
    });
}
//# sourceMappingURL=app-snap.js.map