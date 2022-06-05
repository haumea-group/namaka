import { LitElement } from "lit";
import { ModalControls } from "../modals/modal-types.js";
import { makeAuthModel } from "../../models/auth/auth-model.js";
import { NestedComment } from "../../models/commenting/commenting-types.js";
import { makeCommentingModel } from "../../models/commenting/commenting-model.js";
declare const NamakaComment_base: {
    new (...args: any[]): {
        readonly context: {
            modals: ModalControls;
            auth: ReturnType<typeof makeAuthModel>;
            commenting: ReturnType<typeof makeCommentingModel>;
        };
    };
    withContext(context: {
        modals: ModalControls;
        auth: ReturnType<typeof makeAuthModel>;
        commenting: ReturnType<typeof makeCommentingModel>;
    }): {
        new (...args: any[]): {
            readonly context: {
                modals: ModalControls;
                auth: ReturnType<typeof makeAuthModel>;
                commenting: ReturnType<typeof makeCommentingModel>;
            };
        };
        withContext(context: {
            modals: ModalControls;
            auth: ReturnType<typeof makeAuthModel>;
            commenting: ReturnType<typeof makeCommentingModel>;
        }): any & typeof LitElement;
        withSubscriptions(...subscribes: import("../../../namaka.js").Subscribe[]): any & typeof LitElement;
    } & typeof LitElement;
    withSubscriptions(...subscribes: import("../../../namaka.js").Subscribe[]): any & typeof LitElement;
} & typeof LitElement;
export declare class NamakaComment extends NamakaComment_base {
    #private;
    private FiveStar;
    comment?: NestedComment;
    private showDropDown;
    firstUpdated(): Promise<void>;
    render(): import("lit-html").TemplateResult<1> | null;
}
export {};
