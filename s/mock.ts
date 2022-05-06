
import {makeAppSnap} from "./frontend/models/app-snap.js"
import {prepareModels} from "./frontend/models/prepare-models.js"
import {mockApiConnection} from "./frontend/startup/mock-api-connection.js"
import {prepareComponents} from "./frontend/components/prepare-components.js"
import {registerComponents} from "./frontend/framework/register-components.js"

const snap = makeAppSnap()
const {remote, authDevice} = await mockApiConnection({snap})
const models = prepareModels({snap, remote, authDevice})
const components = prepareComponents({snap, models})

registerComponents(components)
