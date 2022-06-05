import { validateId } from "./validators.js";
import { schema } from "../../../toolbox/darkvalley.js";
export const validateUnbanParams = schema({
    userId: validateId,
});
//# sourceMappingURL=validate-admin-unban-params.js.map