
import {validateId} from "./validators.js"
import {UnbanParams} from "../../types/concepts.js"
import {schema} from "../../../toolbox/darkvalley.js"

export const validateUnbanParams = schema<UnbanParams>({
	userId: validateId,
})
