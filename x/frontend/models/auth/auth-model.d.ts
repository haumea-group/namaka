import { AppSnap } from "../app-snap.js";
import { AuthDevice } from "../../frontend-types.js";
export declare function makeAuthModel({ snap: { state, readable }, authDevice }: {
    snap: AppSnap;
    authDevice: AuthDevice;
}): {
    readonly user: import("../../../common-index.js").User | undefined;
    login(): Promise<void>;
    logout(): Promise<void>;
    mockLogins: {
        regular: () => void;
        admin: () => void;
    };
};
