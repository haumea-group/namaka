import { BanUser } from "../../types/concepts.js";
import { schema } from "../../../toolbox/darkvalley.js";

import { validateId, validateUntil } from "./validators";

export const validateAdminBanUser = schema<BanUser>({
  userId: validateId,
  until: validateUntil,
});