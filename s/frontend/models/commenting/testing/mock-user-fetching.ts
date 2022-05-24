
import * as dbmage from "dbmage"

import {User, UserIntegration} from "../../../../api/types/auth.js"
import {makeJsonStore, makeMemoryStorage, SimpleStorage} from "../../../../toolbox/json-storage.js"

export function mockUserFetching(
		storage: SimpleStorage = makeMemoryStorage()
) {
	// console.log(window.localStorage)

	const key = "mock-users"
	const store = makeJsonStore(storage)
	console.log(store.getItem<User[]>(key))
	const users = store.getItem<User[]>(key)
		?? []
	
	console.log(users)
	
	if (users.length === 0) {
		console.log("halo")
		store.setItem(key, users)
	}
	
	return {

		addUser(user: User) {
			users.push(user)
			store.setItem(key, users)
			console.log("tu?")
		},

		async fetchUsers(
				ids: dbmage.Id[]
			): Promise<UserIntegration[]> {

			return ids.map(id => {
				const user = users.find(u => u.id === id.string)
				if (!user)
					throw new Error(`user missing ${id.string}`)
				return {
					...user,
					id,
				}
			})
		},
	}
}
