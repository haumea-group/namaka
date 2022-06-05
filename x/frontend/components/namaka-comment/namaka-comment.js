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
var _NamakaComment_instances, _NamakaComment_getComment, _NamakaComment_canPost_get, _NamakaComment_postRandomReply, _NamakaComment_toggleDropDown, _NamakaComment_archiveThisComment, _NamakaComment_modalPrompts_get, _NamakaComment_renderDropDown;
import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { mixinStyles } from "../../framework/mixins/mixin-styles.js";
import { mixinStandard } from "../../framework/mixins/mixin-standard.js";
import { randomComment, randomSubject } from "../../../toolbox/randomly.js";
import namakaCommentCss from "./namaka-comment.css.js";
import edit2Svg from "../../../icons/feather/edit-2.svg.js";
import trash2Svg from "../../../icons/feather/trash2.svg.js";
import infoSquareSvg from "../../../icons/tabler/info-square.svg.js";
import alertTriangleSvg from "../../../icons/feather/alert-triangle.svg.js";
import { obtool } from "../../../toolbox/obtool.js";
import { howLongAgo } from "../../../toolbox/how-long-ago.js";
import { virtualFiveStar } from "../virtual/virtual-five-star.js";
import { banUserModalView } from "../modals/views/ban-user/ban-user-modal-view.js";
import { mixinRefreshInterval } from "../../framework/mixins/mixin-refresh-interval.js";
import { reportUserModalView } from "../modals/views/report-user/report-user-modal-view.js";
import { deletePostModalView } from "../modals/views/delete-post/delete-post-modal-view.js";
import { recursivelyCountAllNestedChildren } from "./utils/recursively-count-all-nested-children.js";
let NamakaComment = class NamakaComment extends mixinStandard()(LitElement) {
    constructor() {
        super(...arguments);
        _NamakaComment_instances.add(this);
        this.FiveStar = virtualFiveStar.attach({ component: this });
        this.comment = undefined;
        this.showDropDown = false;
        _NamakaComment_postRandomReply.set(this, async () => {
            if (__classPrivateFieldGet(this, _NamakaComment_instances, "a", _NamakaComment_canPost_get)) {
                const { id, topicId } = __classPrivateFieldGet(this, _NamakaComment_instances, "m", _NamakaComment_getComment).call(this);
                await this.context.commenting.postComment({
                    topicId: topicId,
                    parentCommentId: id,
                    subject: randomSubject(),
                    body: [randomComment(), randomComment(), randomComment()].join(" "),
                });
            }
        });
        _NamakaComment_toggleDropDown.set(this, () => {
            this.showDropDown = !this.showDropDown;
        });
        _NamakaComment_archiveThisComment.set(this, async () => {
            const comment = __classPrivateFieldGet(this, _NamakaComment_instances, "m", _NamakaComment_getComment).call(this);
            return this.context.commenting.archiveComments([comment.id]);
        });
        _NamakaComment_renderDropDown.set(this, () => {
            var _a;
            const comment = __classPrivateFieldGet(this, _NamakaComment_instances, "m", _NamakaComment_getComment).call(this);
            const { user } = this.context.auth;
            const isUserLoggedIn = !!user;
            const { canArchiveAnyComment, canEditAnyComment, canBanUsers } = (_a = user === null || user === void 0 ? void 0 : user.permissions) !== null && _a !== void 0 ? _a : {};
            const isAuthor = isUserLoggedIn
                && (user === null || user === void 0 ? void 0 : user.id) === comment.user.id;
            const buttons = {
                delete: canArchiveAnyComment || isAuthor,
                edit: isAuthor || canEditAnyComment,
                ban: canBanUsers,
            };
            const isThread = comment.parentCommentId === undefined;
            const isReview = comment.scoring !== undefined;
            const postType = isThread
                ? isReview
                    ? "review"
                    : "thread"
                : "reply";
            const prompts = __classPrivateFieldGet(this, _NamakaComment_instances, "a", _NamakaComment_modalPrompts_get);
            return html `
			<div class=blanket @click=${__classPrivateFieldGet(this, _NamakaComment_toggleDropDown, "f")}></div>
			<div class=dropdownmenu part=dropdownmenu>
				<button
					part=report
					@click=${prompts.report}>
						${infoSquareSvg}
						Report user
				</button>

				${buttons.ban
                ? html `
						<button part=suspend @click=${prompts.ban}>
							${alertTriangleSvg}
							Suspend user
						</button>
					`
                : null}

				${buttons.delete
                ? html `
						<button part=delete @click=${prompts.delete}>
							${trash2Svg}
							Delete ${postType}
						</button>
					`
                : null}

				${buttons.edit
                ? html `
						<button part=edit @click=${prompts.edit}>
							${edit2Svg}
							Edit ${postType}
						</button>
					`
                : null}
			</div>
		`;
        });
    }
    async firstUpdated() {
        const comment = __classPrivateFieldGet(this, _NamakaComment_instances, "m", _NamakaComment_getComment).call(this);
        this.FiveStar.setState({
            rating: comment.scoring
                ? comment.scoring.average
                : 0,
            editable: false,
        });
    }
    render() {
        const { FiveStar } = this;
        const comment = __classPrivateFieldGet(this, _NamakaComment_instances, "m", _NamakaComment_getComment).call(this);
        if (!comment.user)
            return null;
        const replyCount = recursivelyCountAllNestedChildren(comment);
        return html `
			<section>
				<namaka-avatar .user=${comment.user}></namaka-avatar>
				<div class=plate>

					<header>
						<span class=nickname>
							${comment.user.profile.nickname}
						</span>
						<span class=fivestar>
							${comment.scoring
            ? FiveStar()
            : null}
						</span>
						<button class=dropdownbutton @click=${__classPrivateFieldGet(this, _NamakaComment_toggleDropDown, "f")}>
							&bull;&bull;&bull;
						</button>
					</header>

					<div class=text>
						<p class=subject>
							${comment.subject}
						</p>
						<p class=body>
							${comment.body}
						</p>
					</div>

					<footer>
						<span class=time>
							${howLongAgo(comment.timePosted)}
						</span>
						${replyCount > 0
            ? html `
								<span>—</span>
								<span>
									${replyCount}
									${replyCount === 1 ? "reply" : "replies"}
								</span>
							`
            : null}
						${__classPrivateFieldGet(this, _NamakaComment_instances, "a", _NamakaComment_canPost_get)
            ? html `
								<button
									part=button
									class=reply
									@click=${__classPrivateFieldGet(this, _NamakaComment_postRandomReply, "f")}>
										Reply
								</button>`
            : null}
					</footer>
				</div>
			</section>

			${this.showDropDown
            ? __classPrivateFieldGet(this, _NamakaComment_renderDropDown, "f").call(this)
            : null}

			<slot class=nested-reply></slot>
		`;
    }
};
_NamakaComment_postRandomReply = new WeakMap(), _NamakaComment_toggleDropDown = new WeakMap(), _NamakaComment_archiveThisComment = new WeakMap(), _NamakaComment_renderDropDown = new WeakMap(), _NamakaComment_instances = new WeakSet(), _NamakaComment_getComment = function _NamakaComment_getComment() {
    if (!this.comment)
        throw new Error("comment property is required, but not set");
    return this.comment;
}, _NamakaComment_canPost_get = function _NamakaComment_canPost_get() {
    var _a;
    return !!((_a = this.context.auth.user) === null || _a === void 0 ? void 0 : _a.permissions.canPost);
}, _NamakaComment_modalPrompts_get = function _NamakaComment_modalPrompts_get() {
    const { modals, auth: { user } } = this.context;
    const comment = __classPrivateFieldGet(this, _NamakaComment_instances, "m", _NamakaComment_getComment).call(this);
    return obtool({
        report: async () => {
            reportUserModalView({ modals, comment });
        },
        ban: async () => {
            const banPeriod = await banUserModalView({ modals, comment });
            console.log(`ban user ${comment.user.profile.nickname} for ${banPeriod}`);
        },
        delete: async () => {
            const deletionChoice = await deletePostModalView({
                modals,
                comment,
                userCanArchiveAnyComment: !!(user === null || user === void 0 ? void 0 : user.permissions.canArchiveAnyComment),
            });
            if (deletionChoice !== undefined)
                await __classPrivateFieldGet(this, _NamakaComment_archiveThisComment, "f").call(this);
        },
        edit: async () => { },
    }).map(fun => async () => {
        __classPrivateFieldGet(this, _NamakaComment_toggleDropDown, "f").call(this);
        return fun();
    });
};
__decorate([
    property({ type: Object })
], NamakaComment.prototype, "comment", void 0);
__decorate([
    property()
], NamakaComment.prototype, "showDropDown", void 0);
NamakaComment = __decorate([
    mixinRefreshInterval(1000),
    mixinStyles(namakaCommentCss, virtualFiveStar.styles)
], NamakaComment);
export { NamakaComment };
//# sourceMappingURL=namaka-comment.js.map