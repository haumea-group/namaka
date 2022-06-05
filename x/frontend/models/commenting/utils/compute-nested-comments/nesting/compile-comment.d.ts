import { CommentPost } from "../../../../../../api/types/concepts.js";
import { NestingExternals, CompiledComment } from "../../../commenting-types.js";
export declare function compileComment(comment: CommentPost, { users, scores }: NestingExternals): CompiledComment;
