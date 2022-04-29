
import {Constructor} from "../../../toolbox/handy-types.js"
import {mixinSubscriptions, Subscribe} from "./mixin-subscriptions.js"

export function mixinStandard<xContext>() {
	return function<C extends Constructor>(Base: C) {
		return class extends Base {

			static withContext(context: xContext) {
				return class extends this {
					get context() {
						return context
					}
				}
			}

			static withSubscriptions(...subscribes: Subscribe[]): typeof this {
				return mixinSubscriptions(...subscribes)(<any>this)
			}

			get context(): xContext {
				throw new Error("context required")
			}
		}
	}
}
