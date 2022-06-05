import { makeAppSnap } from "./frontend/models/app-snap.js";
import { prepareModels } from "./frontend/models/prepare-models.js";
import { mockApiConnection } from "./frontend/startup/mock-api-connection.js";
import { prepareComponents } from "./frontend/components/prepare-components.js";
import { registerComponents } from "./frontend/framework/register-components.js";
import { installModalSystem } from "./frontend/components/modals/install-modal-system.js";
const snap = makeAppSnap();
let { remote, authDevice } = await mockApiConnection({ snap });
const models = prepareModels({ snap, remote: remote['v1'], authDevice });
const modals = installModalSystem();
const components = prepareComponents({ snap, modals, models });
registerComponents(components);
//# sourceMappingURL=mock.js.map