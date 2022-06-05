import { CSSResultGroup, LitElement, TemplateResult } from "lit";
export declare function virtual<xState, xDetails = void, xProps = void>({ initialState, styles, setup, }: {
    initialState: xState;
    styles?: CSSResultGroup;
    setup: (options: SetupOptions<xState>, details: xDetails) => RenderDefinition<xState, xProps>;
}): Attachable<xState, xDetails, xProps>;
export interface SetupOptions<xState> {
    getState(): xState;
    setState(newState: xState): void;
    component: LitElement;
}
export declare type RenderDefinition<xState, xProps> = (state: xState, props: xProps) => TemplateResult | null;
export interface Render<xState, xProps> {
    (props: xProps): TemplateResult | null;
    readonly state: xState;
    setState(newState: xState): void;
}
export interface AttachOptions<xState> {
    component: LitElement;
    state?: xState;
    onStateChange?: (state: xState) => void;
}
export interface Attachable<xState, xDetails, xProps> {
    attach({}: AttachOptions<xState>, details: xDetails): Render<xState, xProps>;
    styles: CSSResultGroup;
}
