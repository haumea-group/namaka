export interface SimpleStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}
export interface JsonStore {
    getItem<T>(key: string): T | undefined;
    setItem<T>(key: string, value: T): void;
}
export declare function makeMemoryStorage(): SimpleStorage;
export declare function makeJsonStore(storage: SimpleStorage): JsonStore;
