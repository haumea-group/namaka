
export interface SimpleStorage {
	getItem(key: string): string | null
	setItem(key: string, value: string): void
}

export interface JsonStore {
	getItem<T>(key: string): T | undefined
	setItem<T>(key: string, value: T): void
}

export function makeMemoryStorage(): SimpleStorage {
	const map = new Map<string, string>()
	return {
		getItem(key) {
			return map.get(key)!
		},
		setItem(key, value) {
			map.set(key, value)
		},
	}
}

export function makeJsonStore(
		storage: SimpleStorage
	): JsonStore {
	return {
		getItem(key) {
			const data = storage.getItem(key)
			if (data) {
				try { return JSON.parse(data) }
				catch (error) { return null }
			}
			else
				return null
		},
		setItem(key, value) {
			storage.setItem(key, JSON.stringify(value))
		},
	}
}
