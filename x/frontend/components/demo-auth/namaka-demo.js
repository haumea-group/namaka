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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _NamakaDemo_modalTestCount, _NamakaDemo_modalTestConfirm, _NamakaDemo_clearLocalStorage;
import { html, LitElement } from "lit";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import { mixinStandard } from "../../framework/mixins/mixin-standard.js";
import NamakaDemoCss from "./namaka-demo.css.js";
import { ExampleTimer } from "../../framework/magical/examples/example-timer.js";
import { ExampleCounter } from "../../framework/magical/examples/example-counter.js";
let NamakaDemo = class NamakaDemo extends mixinStandard()(LitElement) {
    constructor() {
        super(...arguments);
        _NamakaDemo_modalTestCount.set(this, 0);
        _NamakaDemo_modalTestConfirm.set(this, async () => {
            var _a, _b;
            const n = (__classPrivateFieldSet(this, _NamakaDemo_modalTestCount, (_b = __classPrivateFieldGet(this, _NamakaDemo_modalTestCount, "f"), _a = _b++, _b), "f"), _a);
            const result = await this.context.modals.confirm({
                renderContent: () => html `
				<h2>modal confirm #${n}</h2>
				<p>this is a test of the modal system.</p>
				<button @click=${__classPrivateFieldGet(this, _NamakaDemo_modalTestConfirm, "f")}>spawn nested modal</button>
			`,
            });
            console.log("modal", n, "returned", result);
        });
        _NamakaDemo_clearLocalStorage.set(this, () => {
            window.localStorage.clear();
            this.context.commenting.wipeComments();
        });
    }
    render() {
        var _a;
        const { auth } = this.context;
        const isLoggedIn = !!auth.user;
        const isAdmin = !!((_a = auth.user) === null || _a === void 0 ? void 0 : _a.permissions.canArchiveAnyComment);
        return html `
			<div>
				<button
					?disabled=${isLoggedIn}
					@click=${auth.mockLogins.regular}>
						login (regular)
				</button>
				<button
					?disabled=${isLoggedIn}
					@click=${auth.mockLogins.admin}>
						login (admin)
				</button>
				<button
					?disabled=${!isLoggedIn}
					@click=${auth.logout}>
						logout
				</button>
			</div>

			<div>
				<button
					@click=${__classPrivateFieldGet(this, _NamakaDemo_modalTestConfirm, "f")}>
						test modal
				</button>
				<button
					@click=${__classPrivateFieldGet(this, _NamakaDemo_clearLocalStorage, "f")}>
						wipe database
				</button>
			</div>

			${auth.user
            ? html `
					<p>
						logged in as
						${isAdmin ? "(admin)" : null}
						"${auth.user.profile.nickname}"
					</p>	
				`
            : html `<p>logged out</p>`}
			
			<br/>

			${ExampleCounter(0)}
			<br/>
			<br/>
			${ExampleTimer()}
		`;
    }
};
_NamakaDemo_modalTestCount = new WeakMap(), _NamakaDemo_modalTestConfirm = new WeakMap(), _NamakaDemo_clearLocalStorage = new WeakMap();
NamakaDemo = __decorate([
    mixinStyles(NamakaDemoCss, ExampleTimer.css)
], NamakaDemo);
export { NamakaDemo };
//# sourceMappingURL=namaka-demo.js.map