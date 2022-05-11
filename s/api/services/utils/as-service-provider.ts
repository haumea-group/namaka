
import {ServiceProvider} from "../../types/service.js"

export function asServiceProvider<T extends ServiceProvider>(p: T) {
	return p
}
