import { LitElement } from "lit";
import { Validator } from "../../../toolbox/darkvalley.js";
export declare class NamakaTextarea extends LitElement {
    #private;
    private inputValue;
    maxCharacters: number;
    private problems;
    validator: Validator<string>;
    render(): import("lit-html").TemplateResult<1>;
}
