
import {css} from "lit"

import {NamakaModals} from "./namaka-modals.js"
import {themeComponents} from "../../framework/theme-components.js"
import {registerComponents} from "../../framework/register-components.js"

import themeCss from "../theme.css.js"
import modalViewsCss from "./views/modal-views.css.js"

export function installModalSystem() {

	const styles = css`
		${themeCss}
		${modalViewsCss}
	`

	registerComponents(themeComponents(styles, {NamakaModals}))

	const namakaModals = NamakaModals.elementName
	let modals = <NamakaModals>document.querySelector(namakaModals)

	if (!modals) {
		console.log("create new modals")
		modals = <NamakaModals>document.createElement(namakaModals)
		document.body.prepend(modals)
	}

	return modals.controls
}
