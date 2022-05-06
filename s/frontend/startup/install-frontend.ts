
import {makeAppSnap} from "../models/app-snap.js"
import {AppRemote} from "../../api/types/remote.js"
import {prepareModels} from "../models/prepare-models.js"
import {prepareComponents} from "../components/prepare-components.js"
import {registerComponents} from "../framework/register-components.js"

export function installFrontend({remote}: {
		remote: AppRemote
	}) {

	const snap = makeAppSnap()
	const models = prepareModels({snap, remote})
	const components = prepareComponents({snap, models})

	registerComponents(components)
}
