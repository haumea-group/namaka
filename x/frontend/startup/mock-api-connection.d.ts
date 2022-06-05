import { AppSnap } from "../models/app-snap.js";
import { AuthDevice } from "../frontend-types.js";
import { AppRemote } from "../../api/types/remote.js";
export declare function mockApiConnection({ snap }: {
    snap: AppSnap;
}): Promise<{
    remote: AppRemote;
    authDevice: AuthDevice;
}>;
