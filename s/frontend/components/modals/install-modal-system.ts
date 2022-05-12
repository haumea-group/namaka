
import {NamakaModals} from "./namaka-modals.js"
import {themeComponents} from "../../framework/theme-components.js"
import {registerComponents} from "../../framework/register-components.js"

import themeCss from "../theme.css.js"

export function installModalSystem() {

	registerComponents(themeComponents(themeCss, {NamakaModals}))

	const modals = <NamakaModals>document.createElement("namaka-modals")
	document.body.prepend(modals)

	return modals.controls
}
