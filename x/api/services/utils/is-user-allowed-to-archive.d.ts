import { User } from "../../types/auth.js";
import { CommentRow } from "../../types/schema.js";
export declare function isUserAllowedToArchive(user: User, comment: CommentRow): boolean;
