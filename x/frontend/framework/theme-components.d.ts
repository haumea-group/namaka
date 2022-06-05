import { LitElement, CSSResultGroup } from "lit";
import { Constructor } from "../../toolbox/handy-types.js";
export declare const themeComponents: <xComponents extends {
    [key: string]: Constructor<LitElement>;
}>(theme: CSSResultGroup, components: xComponents) => xComponents;
