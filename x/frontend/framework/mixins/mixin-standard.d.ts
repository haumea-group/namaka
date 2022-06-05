import { Constructor } from "../../../toolbox/handy-types.js";
import { Subscribe } from "./mixin-subscriptions.js";
export declare function mixinStandard<xContext>(): <C extends Constructor<{}>>(Base: C) => {
    new (...args: any[]): {
        readonly context: xContext;
    };
    withContext(context: xContext): {
        new (...args: any[]): {
            readonly context: xContext;
        };
        withContext(context: xContext): any & C;
        withSubscriptions(...subscribes: Subscribe[]): typeof this;
    } & C;
    withSubscriptions(...subscribes: Subscribe[]): typeof this;
} & C;
