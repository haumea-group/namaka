
import {LitElement, CSSResultGroup} from "lit"
import {Constructor} from "../../../toolbox/handy-types.js"

function arrayize<T>(item: T | T[]) {
	return <T[]>[item].flat()
}

const notUndefined = (x: any) => x !== undefined

function combineStyles(parentStyles: CSSResultGroup, newStyles: CSSResultGroup[]) {
	const styles = [
		...(arrayize(parentStyles) ?? []),
		...arrayize(newStyles),
	]
	return styles
		.flat()
		.filter(notUndefined)
}

export function mixinStyles(...newStyles: CSSResultGroup[]) {
	return function<C extends Constructor<LitElement>>(Base: C): C {
		return class extends Base {
			static styles = combineStyles(
				(<any>Base).styles,
				newStyles,
			)
		}
	}
}
