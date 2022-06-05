import { clone } from "../../toolbox/clone.js";
import { css } from "lit";
export function virtual({ initialState, styles = css ``, setup, }) {
    return {
        styles,
        attach({ component, state = initialState, onStateChange = () => { }, }, details) {
            function getState() {
                return Object.freeze(clone(state));
            }
            function setState(newState) {
                state = newState;
                component.requestUpdate();
                onStateChange(getState());
            }
            const render = setup({ component, getState, setState }, details);
            function finalRender(props) {
                return render(getState(), props);
            }
            finalRender.setState = setState;
            Object.defineProperty(finalRender, "state", {
                get: getState,
                configurable: false,
            });
            return finalRender;
        },
    };
}
//# sourceMappingURL=virtual.js.map