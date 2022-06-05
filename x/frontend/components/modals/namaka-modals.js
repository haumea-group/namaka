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
var _NamakaModals_instances, _NamakaModals_popups, _NamakaModals_top_get;
var NamakaModals_1;
import { html, LitElement } from "lit";
import { dashify } from "../../../toolbox/dashify.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import namakaModalsCss from "./namaka-modals.css.js";
import banUserModalViewCss from "./views/ban-user/ban-user-modal-view.css.js";
import deletePostModalViewCss from "./views/delete-post/delete-post-modal-view.css.js";
import reportUserModalViewCss from "./views/report-user/report-user-modal-view.css.js";
let NamakaModals = NamakaModals_1 = class NamakaModals extends LitElement {
    constructor() {
        super(...arguments);
        _NamakaModals_instances.add(this);
        _NamakaModals_popups.set(this, new Set());
        this.controls = {
            component: this,
            openModal: ({ renderContent, onClose = () => { }, onBlanketClick = ({ closeModal }) => closeModal(), }) => {
                const newPopup = {
                    onBlanketClick,
                    actions: {
                        closeModal: () => {
                            __classPrivateFieldGet(this, _NamakaModals_popups, "f").delete(newPopup);
                            this.requestUpdate();
                            onClose();
                        },
                    },
                    renderContent,
                };
                __classPrivateFieldGet(this, _NamakaModals_popups, "f").add(newPopup);
                this.requestUpdate();
                return newPopup.actions;
            },
            confirm: async ({ onBlanketClick = ({ closeModal }) => closeModal(), renderNo = () => html `no`, renderYes = () => html `yes`, renderContent, }) => new Promise((resolve) => {
                let result = false;
                this.controls.openModal({
                    onBlanketClick,
                    renderContent: ({ closeModal }) => {
                        const yes = () => {
                            result = true;
                            closeModal();
                        };
                        const no = () => {
                            result = false;
                            closeModal();
                        };
                        return html `
						<div class=innercontent>
							${renderContent({ yes, no })}
						</div>
						<div class=buttons>
							<button class=yes @click=${yes}>${renderYes()}</button>
							<button class=no @click=${no}>${renderNo()}</button>
						</div>
					`;
                    },
                    onClose: () => resolve(result),
                });
            }),
        };
    }
    render() {
        return html `
			${[...__classPrivateFieldGet(this, _NamakaModals_popups, "f")].map(openModal => html `
				<div class=popup>

					<div
						class=blanket
						@click=${() => openModal.onBlanketClick({
            closeModal: openModal.actions.closeModal,
        })}
					></div>

					<div class=content style="top: ${__classPrivateFieldGet(this, _NamakaModals_instances, "a", _NamakaModals_top_get)}px">
						${openModal.renderContent(openModal.actions)}
					</div>
				</div>
			`)}
		`;
    }
};
_NamakaModals_popups = new WeakMap(), _NamakaModals_instances = new WeakSet(), _NamakaModals_top_get = function _NamakaModals_top_get() {
    var _a;
    return (_a = window.scrollY) !== null && _a !== void 0 ? _a : 0;
};
NamakaModals.elementName = dashify(NamakaModals_1.name);
NamakaModals = NamakaModals_1 = __decorate([
    mixinStyles(namakaModalsCss, reportUserModalViewCss, deletePostModalViewCss, banUserModalViewCss)
], NamakaModals);
export { NamakaModals };
//# sourceMappingURL=namaka-modals.js.map