
import {LitElement, CSSResultGroup} from "lit"
import {objectMap} from "@chasemoskal/snapstate"

import {mixinStyles} from "./mixins/mixin-styles.js"
import {Constructor} from "../../toolbox/handy-types.js"

export const themeComponents = <
		xComponents extends {[key: string]: Constructor<LitElement>}
	>(
		theme: CSSResultGroup,
		components: xComponents,
	): xComponents => {

	return objectMap(
		components,
		Component => mixinStyles(theme)(Component),
	)
}
