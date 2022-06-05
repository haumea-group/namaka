import { AppSnap } from "../models/app-snap.js";
import { NamakaLoadMore } from "./load-more/index.js";
import { ModalControls } from "./modals/modal-types.js";
import { NamakaBans } from "./banned-users/index.js";
import { prepareModels } from "../models/prepare-models.js";
import { NamakaMyReview } from "./reviews/my-review/index.js";
import { NamakaUnban } from "./modal/namaka-unban/namaka-unban.js";
import { NamakaEditComment } from "./reviews/edit-review/index.js";
import { NamakaTextarea } from "./namaka-textarea/namaka-textarea.js";
import { NamakaAuthorReply } from "./namaka-author-reply/namaka-author-reply.js";
import { NamakaBan } from "./modal/namaka-ban/namaka-ban.js";
import { NamakaHorizontalReview } from "./reviews/horizontal-five-star-review/index.js";
import { NamakaWriteAComment } from "./modal/namaka-write-a-comment/namaka-write-a-comment.js";
import { NamakaCopyToClipboard } from "./namaka-copy-to-clipboard/namaka-copy-to-clipboard.js";
import { NamakaArchiveComment } from "./modal/namaka-archive-comment/namaka-archive-comment.js";
import { NamakaAvatar } from "./namaka-avatar/namaka-avatar.js";
export declare function prepareComponents({ modals, snap: { subscribe }, models: { auth, commenting }, }: {
    snap: AppSnap;
    modals: ModalControls;
    models: ReturnType<typeof prepareModels>;
}): {
    NamakaTextarea: typeof NamakaTextarea;
    NamakaAuthorReply: typeof NamakaAuthorReply;
    NamakaMyReview: typeof NamakaMyReview;
    NamakaHorizontalReview: typeof NamakaHorizontalReview;
    NamakaEditComment: typeof NamakaEditComment;
    NamakaBans: typeof NamakaBans;
    NamakaLoadMore: typeof NamakaLoadMore;
    NamakaUnban: typeof NamakaUnban;
    NamakaBan: typeof NamakaBan;
    NamakaArchiveComment: typeof NamakaArchiveComment;
    NamakaWriteAComment: typeof NamakaWriteAComment;
    NamakaAvatar: typeof NamakaAvatar;
    NamakaBoardStats: {
        new (...args: any[]): {
            readonly context: {
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            };
        };
        withContext(context: {
            auth: {
                readonly user: import("../../common-index.js").User | undefined;
                login(): Promise<void>;
                logout(): Promise<void>;
                mockLogins: {
                    regular: () => void;
                    admin: () => void;
                };
            };
            commenting: {
                wipeComments(): void;
                getUser(id: string): import("../../common-index.js").User | undefined;
                getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                downloadComments(topicId: string): Promise<void>;
                postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                archiveComments(ids: string[]): Promise<void>;
            };
        }): {
            new (...args: any[]): {
                readonly context: {
                    auth: {
                        readonly user: import("../../common-index.js").User | undefined;
                        login(): Promise<void>;
                        logout(): Promise<void>;
                        mockLogins: {
                            regular: () => void;
                            admin: () => void;
                        };
                    };
                    commenting: {
                        wipeComments(): void;
                        getUser(id: string): import("../../common-index.js").User | undefined;
                        getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                        downloadComments(topicId: string): Promise<void>;
                        postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                        getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                        editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                        archiveComments(ids: string[]): Promise<void>;
                    };
                };
            };
            withContext(context: {
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            }): any & typeof import("lit").LitElement;
            withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
        } & typeof import("lit").LitElement;
        withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
    } & typeof import("lit").LitElement;
    NamakaComment: {
        new (...args: any[]): {
            readonly context: {
                modals: ModalControls;
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            };
        };
        withContext(context: {
            modals: ModalControls;
            auth: {
                readonly user: import("../../common-index.js").User | undefined;
                login(): Promise<void>;
                logout(): Promise<void>;
                mockLogins: {
                    regular: () => void;
                    admin: () => void;
                };
            };
            commenting: {
                wipeComments(): void;
                getUser(id: string): import("../../common-index.js").User | undefined;
                getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                downloadComments(topicId: string): Promise<void>;
                postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                archiveComments(ids: string[]): Promise<void>;
            };
        }): {
            new (...args: any[]): {
                readonly context: {
                    modals: ModalControls;
                    auth: {
                        readonly user: import("../../common-index.js").User | undefined;
                        login(): Promise<void>;
                        logout(): Promise<void>;
                        mockLogins: {
                            regular: () => void;
                            admin: () => void;
                        };
                    };
                    commenting: {
                        wipeComments(): void;
                        getUser(id: string): import("../../common-index.js").User | undefined;
                        getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                        downloadComments(topicId: string): Promise<void>;
                        postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                        getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                        editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                        archiveComments(ids: string[]): Promise<void>;
                    };
                };
            };
            withContext(context: {
                modals: ModalControls;
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            }): any & typeof import("lit").LitElement;
            withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
        } & typeof import("lit").LitElement;
        withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
    } & typeof import("lit").LitElement;
    NamakaDemo: {
        new (...args: any[]): {
            readonly context: {
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                modals: ModalControls;
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            };
        };
        withContext(context: {
            auth: {
                readonly user: import("../../common-index.js").User | undefined;
                login(): Promise<void>;
                logout(): Promise<void>;
                mockLogins: {
                    regular: () => void;
                    admin: () => void;
                };
            };
            modals: ModalControls;
            commenting: {
                wipeComments(): void;
                getUser(id: string): import("../../common-index.js").User | undefined;
                getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                downloadComments(topicId: string): Promise<void>;
                postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                archiveComments(ids: string[]): Promise<void>;
            };
        }): {
            new (...args: any[]): {
                readonly context: {
                    auth: {
                        readonly user: import("../../common-index.js").User | undefined;
                        login(): Promise<void>;
                        logout(): Promise<void>;
                        mockLogins: {
                            regular: () => void;
                            admin: () => void;
                        };
                    };
                    modals: ModalControls;
                    commenting: {
                        wipeComments(): void;
                        getUser(id: string): import("../../common-index.js").User | undefined;
                        getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                        downloadComments(topicId: string): Promise<void>;
                        postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                        getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                        editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                        archiveComments(ids: string[]): Promise<void>;
                    };
                };
            };
            withContext(context: {
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                modals: ModalControls;
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            }): any & typeof import("lit").LitElement;
            withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
        } & typeof import("lit").LitElement;
        withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
    } & typeof import("lit").LitElement;
    NamakaBoard: {
        new (...args: any[]): {
            readonly context: {
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            };
        };
        withContext(context: {
            auth: {
                readonly user: import("../../common-index.js").User | undefined;
                login(): Promise<void>;
                logout(): Promise<void>;
                mockLogins: {
                    regular: () => void;
                    admin: () => void;
                };
            };
            commenting: {
                wipeComments(): void;
                getUser(id: string): import("../../common-index.js").User | undefined;
                getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                downloadComments(topicId: string): Promise<void>;
                postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                archiveComments(ids: string[]): Promise<void>;
            };
        }): {
            new (...args: any[]): {
                readonly context: {
                    auth: {
                        readonly user: import("../../common-index.js").User | undefined;
                        login(): Promise<void>;
                        logout(): Promise<void>;
                        mockLogins: {
                            regular: () => void;
                            admin: () => void;
                        };
                    };
                    commenting: {
                        wipeComments(): void;
                        getUser(id: string): import("../../common-index.js").User | undefined;
                        getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                        downloadComments(topicId: string): Promise<void>;
                        postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                        getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                        editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                        archiveComments(ids: string[]): Promise<void>;
                    };
                };
            };
            withContext(context: {
                auth: {
                    readonly user: import("../../common-index.js").User | undefined;
                    login(): Promise<void>;
                    logout(): Promise<void>;
                    mockLogins: {
                        regular: () => void;
                        admin: () => void;
                    };
                };
                commenting: {
                    wipeComments(): void;
                    getUser(id: string): import("../../common-index.js").User | undefined;
                    getComments(topicId: string): import("../models/commenting/commenting-types.js").NestedComment[];
                    downloadComments(topicId: string): Promise<void>;
                    postComment(draft: import("../../api/types/concepts.js").CommentPostDraft): Promise<import("../../api/types/concepts.js").CommentPost>;
                    getTopicStats(topicId: string): Promise<import("../../api/types/concepts.js").BoardStats>;
                    editComment(draft: import("../../api/types/concepts.js").CommentEditDraft): Promise<void>;
                    archiveComments(ids: string[]): Promise<void>;
                };
            }): any & typeof import("lit").LitElement;
            withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
        } & typeof import("lit").LitElement;
        withSubscriptions(...subscribes: import("../../namaka.js").Subscribe[]): any & typeof import("lit").LitElement;
    } & typeof import("lit").LitElement;
    NamakaCopyToClipboard: typeof NamakaCopyToClipboard;
};
