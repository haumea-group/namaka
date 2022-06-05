export function makeMemoryStorage() {
    const map = new Map();
    return {
        getItem(key) {
            return map.get(key);
        },
        setItem(key, value) {
            map.set(key, value);
        },
    };
}
export function makeJsonStore(storage) {
    return {
        getItem(key) {
            const data = storage.getItem(key);
            if (data) {
                try {
                    return JSON.parse(data);
                }
                catch (error) {
                    return null;
                }
            }
            else
                return null;
        },
        setItem(key, value) {
            storage.setItem(key, JSON.stringify(value));
        },
    };
}
//# sourceMappingURL=json-storage.js.map