import {UnBanUser} from "../../types/concepts.js"
import { schema } from "../../../toolbox/darkvalley.js"

import { validateId } from "./validators.js"

export const validateAdminUnBanUser = schema<UnBanUser>({
	userId: validateId,
})
