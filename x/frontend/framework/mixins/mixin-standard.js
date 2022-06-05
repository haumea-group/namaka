import { mixinSubscriptions } from "./mixin-subscriptions.js";
export function mixinStandard() {
    return function (Base) {
        return class extends Base {
            static withContext(context) {
                return class extends this {
                    get context() {
                        return context;
                    }
                };
            }
            static withSubscriptions(...subscribes) {
                return mixinSubscriptions(...subscribes)(this);
            }
            get context() {
                throw new Error("context required");
            }
        };
    };
}
//# sourceMappingURL=mixin-standard.js.map