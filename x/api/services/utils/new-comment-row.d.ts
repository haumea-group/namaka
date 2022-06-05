import * as dbmage from "dbmage";
import { CommentRow } from "../../types/schema.js";
import { CommentPostDraft } from "../../types/concepts.js";
export declare function newCommentRow({ userId, rando, draft }: {
    userId: string;
    rando: dbmage.Rando;
    draft: CommentPostDraft;
}): CommentRow;
