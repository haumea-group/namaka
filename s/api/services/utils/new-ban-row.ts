import * as dbmage from "dbmage"

import {BanRow} from "../../types/schema.js"
import {BanDraft} from "../../types/concepts.js"

export function newBanRow({userId, banDrafts} : {
	userId: string
	banDrafts: BanDraft[]
}): BanRow[] {

return banDrafts.map(draft => ({
	userId: dbmage.Id.fromString(userId),
	until: draft.until,
	reason: draft.reason
}))
}

