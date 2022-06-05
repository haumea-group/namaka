import { LitElement } from "lit";
export declare class NamakaCopyToClipboard extends LitElement {
    inviteCopied: boolean;
    copyText: string;
    showCopyIcon: boolean;
    hideInviteCopiedIndicator: import("@chasemoskal/snapstate/x/tools/debounce/debounce-types.js").DebounceReturn<() => void>;
    setCopyIcon(bool: boolean): void;
    legacyCopyToClipboard(text: string): boolean;
    copyToClipboard(): void;
    render(): import("lit-html").TemplateResult<1>;
}
