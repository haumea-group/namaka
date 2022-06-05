var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
import { debounce } from "@chasemoskal/snapstate";
import { directive } from "lit-html/directive.js";
import { AsyncDirective } from "lit-html/async-directive.js";
export function magical(sauce) {
    var _MagicDirective_instances, _MagicDirective_wires, _MagicDirective_generateUse, _MagicDirective_resetUseIndexes;
    class MagicDirective extends AsyncDirective {
        constructor() {
            super(...arguments);
            _MagicDirective_instances.add(this);
            _MagicDirective_wires.set(this, {
                state: {
                    index: 0,
                    map: new Map(),
                },
                effect: {
                    index: 0,
                    map: new Map(),
                },
            });
        }
        disconnected() {
            super.disconnected();
            const { state, effect } = __classPrivateFieldGet(this, _MagicDirective_wires, "f");
            for (const dispose of effect.map.values())
                dispose();
            effect.map.clear();
            state.map.clear();
        }
        render(...props) {
            __classPrivateFieldGet(this, _MagicDirective_instances, "m", _MagicDirective_resetUseIndexes).call(this);
            return sauce(__classPrivateFieldGet(this, _MagicDirective_instances, "m", _MagicDirective_generateUse).call(this, ...props))(...props);
        }
    }
    _MagicDirective_wires = new WeakMap(), _MagicDirective_instances = new WeakSet(), _MagicDirective_generateUse = function _MagicDirective_generateUse(...props) {
        const { state, effect } = __classPrivateFieldGet(this, _MagicDirective_wires, "f");
        const rerender = debounce(0, () => this.setValue(this.render(...props)));
        return {
            state(value) {
                const { index, map } = state;
                const initialized = map.has(index);
                if (!initialized)
                    map.set(index, value);
                const currentValue = map.get(index);
                const set = (newValue) => {
                    if (newValue !== currentValue) {
                        map.set(index, newValue);
                        rerender();
                    }
                };
                state.index += 1;
                return [currentValue, set];
            },
            effect(e) {
                const { index, map } = effect;
                const initialized = map.has(index);
                if (!initialized)
                    map.set(index, e(rerender));
                effect.index += 1;
            },
        };
    }, _MagicDirective_resetUseIndexes = function _MagicDirective_resetUseIndexes() {
        const { state, effect } = __classPrivateFieldGet(this, _MagicDirective_wires, "f");
        state.index = 0;
        effect.index = 0;
    };
    return directive(MagicDirective);
}
//# sourceMappingURL=magical.js.map