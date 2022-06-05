import { CSSResultGroup, LitElement, TemplateResult } from "lit";
export interface VirtualConnection<xState, xPublic, xProps> {
    public: xPublic;
    render(state: xState, props: xProps): TemplateResult | null;
    disconnect(): void;
}
export interface VirtualComponentDetails<xState, xDetails, xPublic, xProps> {
    styles?: CSSResultGroup;
    initialState: xState;
    setup: ({}: {
        component: LitElement;
        state: xState;
    }) => (details: xDetails) => VirtualConnection<xState, xPublic, xProps>;
}
export interface VirtualComponentInstance<xDetails, xPublic, xProps> {
    (props: xProps): TemplateResult | null;
    public: xPublic;
    connect(details: xDetails): void;
    disconnect(): void;
}
export interface VirtualComponentBuilder<xDetails, xPublic, xProps> {
    (component: LitElement): VirtualComponentInstance<xDetails, xPublic, xProps>;
    styles: CSSResultGroup;
}
export declare function virtualComponent<xState, xDetails, xPublic, xProps>({ styles, initialState, setup, }: VirtualComponentDetails<xState, xDetails, xPublic, xProps>): VirtualComponentBuilder<xDetails, xPublic, xProps>;
