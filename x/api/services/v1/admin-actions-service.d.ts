import { Auth, User } from "../../types/auth.js";
import { Ban, BanParams, UnbanParams, ListBansParams, FetchBanParams } from "../../types/concepts.js";
export declare const makeAdminActionsService: ({ database, rando, fetchUsers, }: import("../../types/service.js").ServiceOptions) => ({ user, }: Auth) => {
    banUser(rawData: BanParams): Promise<void>;
    unbanUser(rawData: UnbanParams): Promise<void>;
    listBans(rawData: ListBansParams): Promise<{
        bans: Ban[];
        users: User[];
    }>;
    fetchBan(rawData: FetchBanParams): Promise<{
        ban: Ban;
        _user: User[];
    }>;
};
