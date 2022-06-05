import { LitElement } from "lit";
import { Constructor } from "../../../toolbox/handy-types.js";
export declare type Subscribe = (subscription: () => void) => () => void;
export declare function mixinSubscriptions(...subscribes: Subscribe[]): <C extends Constructor<LitElement>>(Base: C) => C;
