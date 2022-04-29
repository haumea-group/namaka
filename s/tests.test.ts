
import {Suite, expect} from "cynic"

export default <Suite>{

	async "test suite is loading"() {
		expect(1).defined()
	},
}
