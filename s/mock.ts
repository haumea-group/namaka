
import {setupMockUser} from "./frontend/startup/setup-mock-user.js"
import {installFrontend} from "./frontend/startup/install-frontend.js"
import {mockApiConnection} from "./frontend/startup/mock-api-connection.js"

installFrontend({
	remote: await mockApiConnection({
		getMockMeta: await setupMockUser(),
	})
})
