var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MyComponent_Counter;
import { snapstate } from "@chasemoskal/snapstate";
import { mixinStyles } from "./mixins/mixin-styles.js";
import { css, html, LitElement } from "lit";
export function virtualComponent({ styles, initialState, setup, }) {
    function builder(component) {
        const snap = snapstate(initialState);
        const connect = setup({ component, state: snap.state });
        let isConnected = false;
        let unsubscribeSnap = () => { };
        let result = {
            public: undefined,
            render() { throw new Error("virtual component is not connected (cannot render)"); },
            disconnect() { throw new Error("virtual component is not connected (cannot disconnect)"); },
        };
        function instance(props) {
            return result.render(snap.readable, props);
        }
        instance.public = result.public;
        instance.disconnect = result.disconnect;
        instance.connect = (details) => {
            if (isConnected)
                throw new Error("virtual component is already connected (cannot connect)");
            isConnected = true;
            unsubscribeSnap = snap.subscribe(() => component.requestUpdate());
            result = connect(details);
            instance.public = result.public;
            instance.disconnect = () => {
                if (!isConnected)
                    throw new Error("virtual component is already disconnected (cannot disconnect)");
                isConnected = false;
                result.disconnect();
                unsubscribeSnap();
            };
        };
        return instance;
    }
    builder.styles = styles;
    return builder;
}
const virtualCounter = virtualComponent({
    styles: css ``,
    initialState: { count: 0 },
    setup: ({ state, component }) => (details) => {
        function increment() {
            state.count += 1;
        }
        return {
            public: { increment },
            disconnect: () => { },
            render: (state, props) => html `
				<p>Count is ${state.count}</p>
				<button @click=${increment}>increment</button>
			`,
        };
    }
});
let MyComponent = class MyComponent extends LitElement {
    constructor() {
        super(...arguments);
        _MyComponent_Counter.set(this, virtualCounter(this));
    }
    connectedCallback() {
        super.connectedCallback();
        __classPrivateFieldGet(this, _MyComponent_Counter, "f").connect();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        __classPrivateFieldGet(this, _MyComponent_Counter, "f").disconnect();
    }
    render() {
        return html `
			<div>
				${__classPrivateFieldGet(this, _MyComponent_Counter, "f").call(this)}
			</div>
		`;
    }
};
_MyComponent_Counter = new WeakMap();
MyComponent = __decorate([
    mixinStyles(virtualCounter.styles)
], MyComponent);
//# sourceMappingURL=virtual2.js.map