import * as dbmage from "dbmage";
import { User, UserIntegration } from "../../../../api/types/auth.js";
import { SimpleStorage } from "../../../../toolbox/json-storage.js";
export declare function mockUserFetching(storage?: SimpleStorage): {
    addUser(user: User): void;
    fetchUsers(ids: dbmage.Id[]): Promise<UserIntegration[]>;
};
