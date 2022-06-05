import { LitElement } from "lit";
import { makeCommentingModel } from "../../models/commenting/commenting-model.js";
import { makeAuthModel } from "../../models/auth/auth-model.js";
import { BoardStats } from "../../../api/types/concepts.js";
declare const NamakaBoardStats_base: {
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
export declare class NamakaBoardStats extends NamakaBoardStats_base {
    topic: string;
    stats?: BoardStats;
    firstUpdated(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
