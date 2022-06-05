import { makeJsonStore, makeMemoryStorage } from "../../../../toolbox/json-storage.js";
export function mockUserFetching(storage = makeMemoryStorage()) {
    var _a;
    const key = "mock-users";
    const store = makeJsonStore(storage);
    const users = (_a = store.getItem(key)) !== null && _a !== void 0 ? _a : [];
    return {
        addUser(user) {
            users.push(user);
            store.setItem(key, users);
        },
        async fetchUsers(ids) {
            return ids.map(id => {
                const user = users.find(u => u.id === id.string);
                if (!user)
                    throw new Error(`user missing ${id.string}`);
                return {
                    ...user,
                    id,
                };
            });
        },
    };
}
//# sourceMappingURL=mock-user-fetching.js.map