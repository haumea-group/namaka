import { LitElement } from "lit";
import { ModalControls } from "../modals/modal-types.js";
import { makeAuthModel } from "../../models/auth/auth-model.js";
import { makeCommentingModel } from "../../models/commenting/commenting-model.js";
declare const NamakaDemo_base: {
    new (...args: any[]): {
        readonly context: {
            auth: ReturnType<typeof makeAuthModel>;
            modals: ModalControls;
            commenting: ReturnType<typeof makeCommentingModel>;
        };
    };
    withContext(context: {
        auth: ReturnType<typeof makeAuthModel>;
        modals: ModalControls;
        commenting: ReturnType<typeof makeCommentingModel>;
    }): {
        new (...args: any[]): {
            readonly context: {
                auth: ReturnType<typeof makeAuthModel>;
                modals: ModalControls;
                commenting: ReturnType<typeof makeCommentingModel>;
            };
        };
        withContext(context: {
            auth: ReturnType<typeof makeAuthModel>;
            modals: ModalControls;
            commenting: ReturnType<typeof makeCommentingModel>;
        }): any & typeof LitElement;
        withSubscriptions(...subscribes: import("../../../namaka.js").Subscribe[]): any & typeof LitElement;
    } & typeof LitElement;
    withSubscriptions(...subscribes: import("../../../namaka.js").Subscribe[]): any & typeof LitElement;
} & typeof LitElement;
export declare class NamakaDemo extends NamakaDemo_base {
    #private;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
