
import {Suite} from "cynic"

import howLongAgoTest from "./toolbox/how-long-ago.test.js"
import commentingModelTest from "./frontend/models/commenting/commenting-model.test.js"

export default <Suite>{
	"commenting model": commentingModelTest,
	"tools": {
		"how long ago": howLongAgoTest,
	},
}
