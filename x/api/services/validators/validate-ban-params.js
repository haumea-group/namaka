import { validateId } from "./validators.js";
import { maxLength, number, schema, string, validator } from "../../../toolbox/darkvalley.js";
export const validateBanParams = schema({
    userId: validateId,
    until: number(),
    reason: validator(string(), maxLength(100)),
});
//# sourceMappingURL=validate-ban-params.js.map