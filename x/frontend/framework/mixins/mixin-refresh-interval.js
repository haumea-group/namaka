var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
export function mixinRefreshInterval(milliseconds) {
    return function (Base) {
        var _refreshInterval, _a;
        return _a = class extends Base {
                constructor() {
                    super(...arguments);
                    _refreshInterval.set(this, void 0);
                }
                connectedCallback() {
                    super.connectedCallback();
                    __classPrivateFieldSet(this, _refreshInterval, setInterval(() => this.requestUpdate(), milliseconds), "f");
                }
                disconnectedCallback() {
                    super.disconnectedCallback();
                    clearInterval(__classPrivateFieldGet(this, _refreshInterval, "f"));
                }
            },
            _refreshInterval = new WeakMap(),
            _a;
    };
}
//# sourceMappingURL=mixin-refresh-interval.js.map