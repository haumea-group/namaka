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
export function mixinSubscriptions(...subscribes) {
    return function (Base) {
        var _unsubscribes, _a;
        return _a = class extends Base {
                constructor() {
                    super(...arguments);
                    _unsubscribes.set(this, []);
                }
                connectedCallback() {
                    super.connectedCallback();
                    const update = () => { this.requestUpdate(); };
                    __classPrivateFieldSet(this, _unsubscribes, subscribes.map(subscribe => subscribe(update)), "f");
                }
                disconnectedCallback() {
                    super.disconnectedCallback();
                    for (const unsubscribe of __classPrivateFieldGet(this, _unsubscribes, "f"))
                        unsubscribe();
                    __classPrivateFieldSet(this, _unsubscribes, [], "f");
                }
            },
            _unsubscribes = new WeakMap(),
            _a;
    };
}
//# sourceMappingURL=mixin-subscriptions.js.map