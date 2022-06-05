import {Ban} from "../../types/concepts.js"
import {BanRow} from "../../types/schema.js"

export function rowsToBans(row: BanRow): Ban {
	return {
		userId: row.userId.string,
		reason: row.reason,
		until: row.until
	}
}

