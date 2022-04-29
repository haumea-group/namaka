
import {AppRemote} from "../../api/types/remote.js"
import {prepareModels} from "../models/prepare-models.js"
import {prepareComponents} from "../components/prepare-components.js"
import {registerComponents} from "../framework/register-components.js"

export function installFrontend({remote}: {
		remote: AppRemote
	}) {

	const models = prepareModels({remote})
	const components = prepareComponents({models})

	registerComponents(components)
}
