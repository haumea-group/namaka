import { BanRow } from "../../types/schema.js";
import { BanDraft } from "../../types/concepts.js";
export declare function newBanRow({ userId, banDrafts }: {
    userId: string;
    banDrafts: BanDraft[];
}): BanRow[];
