import { LitElement } from "lit";
import { makeAuthModel } from "../../models/auth/auth-model.js";
import { makeCommentingModel } from "../../models/commenting/commenting-model.js";
declare const NamakaBoard_base: {
    new (...args: any[]): {
        readonly context: {
            auth: ReturnType<typeof makeAuthModel>;
            commenting: ReturnType<typeof makeCommentingModel>;
        };
    };
    withContext(context: {
        auth: ReturnType<typeof makeAuthModel>;
        commenting: ReturnType<typeof makeCommentingModel>;
    }): {
        new (...args: any[]): {
            readonly context: {
                auth: ReturnType<typeof makeAuthModel>;
                commenting: ReturnType<typeof makeCommentingModel>;
            };
        };
        withContext(context: {
            auth: ReturnType<typeof makeAuthModel>;
            commenting: ReturnType<typeof makeCommentingModel>;
        }): any & typeof LitElement;
        withSubscriptions(...subscribes: import("../../../namaka.js").Subscribe[]): any & typeof LitElement;
    } & typeof LitElement;
    withSubscriptions(...subscribes: import("../../../namaka.js").Subscribe[]): any & typeof LitElement;
} & typeof LitElement;
export declare class NamakaBoard extends NamakaBoard_base {
    #private;
    topic?: string;
    firstUpdated(): Promise<void>;
    render(): import("lit-html").TemplateResult<1> | null;
}
export {};
