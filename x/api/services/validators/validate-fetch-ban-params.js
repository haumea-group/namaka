import { validateId } from "./validators.js";
import { schema } from "../../../toolbox/darkvalley.js";
export const validateFetchBanParams = schema({
    userId: validateId,
});
//# sourceMappingURL=validate-fetch-ban-params.js.map