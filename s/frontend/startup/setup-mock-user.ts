
import * as dbmage from "dbmage"
import {BasicMeta} from "../../api/types/auth.js"

export async function setupMockUser() {

	const rando = await dbmage.getRando()
	const userId = rando.randomId().string

	const getMockMeta = async() => (<BasicMeta>{userId})
	return getMockMeta
}
