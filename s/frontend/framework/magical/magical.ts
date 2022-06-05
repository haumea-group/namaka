
import {directive} from "lit-html/directive.js"
import {AsyncDirective} from "lit-html/async-directive.js"

import {Renderer, Sauce, Use} from "./magical-types.js"

export function magical<xProps extends any[]>(sauce: Sauce<xProps>) {

	class MagicDirective extends AsyncDirective {

		#wires = {
			state: {
				index: 0,
				map: new Map<number, any>(),
			},
			effect: {
				index: 0,
				map: new Map<number, () => void>(),
			},
		}

		#generateUse(...props: xProps): Use {
			const {state, effect} = this.#wires
			const rerender = () => this.setValue(this.render(...props))
			return {

				state<T>(value: T): [T, (value: T) => void] {
					const {index, map} = state
					const initialized = map.has(index)
					if (!initialized)
						map.set(index, value)
					const currentValue = map.get(index)
					const setValue = (newValue: T) => {
						map.set(index, newValue)
						rerender()
					}
					state.index += 1
					return [currentValue, setValue]
				},

				effect(e) {
					const {index, map} = effect
					const initialized = map.has(index)
					if (!initialized) {
						map.set(index, e())
					}
					effect.index += 1
				},
			}
		}

		#resetUseIndexes() {
			const {state, effect} = this.#wires
			state.index = 0
			effect.index = 0
		}

		disconnected() {
			super.disconnected()
			const {state, effect} = this.#wires

			for (const dispose of effect.map.values())
				dispose()

			effect.map.clear()
			state.map.clear()
		}

		render(...props: xProps) {
			this.#resetUseIndexes()
			return sauce(this.#generateUse(...props))(...props)
		}
	}

	return <Renderer<xProps>>directive(MagicDirective)
}
