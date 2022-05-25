
export type Await<T> = T extends Promise<infer U> ? U : T
export type AwaitProps<T> = {[P in keyof T]: Await<T[P]>}
export type PromisedProps<T> = {[P in keyof T]: T[P] | Promise<T[P]>}

export async function concurrent<T>(obj: T): Promise<AwaitProps<T>> {
	const keys = Object.keys(obj)
	const awaitables = Object.values(obj)
	const values = await Promise.all(awaitables)
	const result: {[key: string]: any} = {}
	keys.forEach((key, index) => result[key] = values[index])
	return <AwaitProps<T>>result
}
