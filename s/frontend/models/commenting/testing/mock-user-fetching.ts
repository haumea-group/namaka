
import * as dbmage from "dbmage"

import {User, UserIntegration} from "../../../../api/types/auth.js"
import {makeJsonStore, makeMemoryStorage, SimpleStorage} from "../../../../toolbox/json-storage.js"

export function mockUserFetching(
		storage: SimpleStorage = makeMemoryStorage()
	) {
	const key = "mock-users"
	const store = makeJsonStore(storage)
	const users = store.getItem<User[]>(key)
		?? []
	return {

		addUser(user: User) {
			users.push(user)
			store.setItem(key, users)
		},

		async fetchUsers(
				ids: dbmage.Id[]
			): Promise<UserIntegration[]> {

			return ids.map(id => {
				const user = users.find(u => u.userId === id.string)
				if (!user)
					throw new Error(`user missing ${id.string}`)
				return {
					...user,
					userId: id,
				}
			})
		},
	}
}
