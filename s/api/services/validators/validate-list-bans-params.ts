import {ListBansParams} from "../../types/concepts.js"
import {schema, number} from "../../../toolbox/darkvalley.js"

export const validateListBans = schema<ListBansParams>({
	limit: number(),
	offset: number(),
})
