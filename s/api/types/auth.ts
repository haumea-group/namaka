
import * as dbmage from "dbmage"

export interface Permissions {
	canPost: boolean
	canBanUsers: boolean
	canEditAnyComment: boolean
	canArchiveAnyComment: boolean
}

export interface User {
	userId: string
	profile: Profile
	permissions: Permissions
}

export interface UserIntegration extends Omit<User, "userId"> {
	userId: dbmage.Id
}

export interface Profile {
	nickname: string
	avatar: string
	joinedTime: number
}

export interface MockMeta {
	user: User | undefined
}

export interface Auth {
	user: User | undefined
}
