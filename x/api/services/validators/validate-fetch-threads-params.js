import { validateId } from "./validators.js";
import { schema, number } from "../../../toolbox/darkvalley.js";
export const validateGetCommennts = schema({
    topicId: validateId,
    limit: number(),
    offset: number(),
});
//# sourceMappingURL=validate-fetch-threads-params.js.map