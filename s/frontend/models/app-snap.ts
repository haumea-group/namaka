
import {Snapstate, snapstate} from "@chasemoskal/snapstate"

import {User} from "../../api/types/auth.js"
import {NestedComment} from "./commenting/commenting-types.js"

export interface AppState {
	user: undefined | User
	users: User[]
	nestedComments: NestedComment[]
}

export interface AppSnap extends Snapstate<AppState> {}

export function makeAppSnap(): AppSnap {
	return snapstate<AppState>({
		user: undefined,
		users: [],
		nestedComments: [],
	})
}
