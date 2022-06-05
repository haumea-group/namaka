import { expect } from "cynic";
import { day, hour, second } from "./goodtimes.js";
import { howLongAgo } from "./how-long-ago.js";
export default {
    async "100 ms ago should return null"() {
        expect(howLongAgo(Date.now() - 100))
            .equals(null);
    },
    async "61 seconds ago should show 1 minute ago"() {
        expect(howLongAgo(Date.now() - (61 * second)))
            .equals("1 minute ago");
    },
    async "119 seconds ago should show 2 minutes ago"() {
        expect(howLongAgo(Date.now() - (119 * second)))
            .equals("2 minutes ago");
    },
    async "35 days ago should show '1 month ago'"() {
        expect(howLongAgo(Date.now() - (35 * day)))
            .equals("1 month ago");
    },
    async "1 day in the future should show 'null'"() {
        expect(howLongAgo(Date.now() + (1 * day)))
            .equals(null);
    },
    async "exactly 1 second ago should show '1 second ago'"() {
        expect(howLongAgo(Date.now() - (1 * second)))
            .equals('1 second ago');
    },
    async "exactly 1 day ago should show '1 day ago'"() {
        expect(howLongAgo(Date.now() - (1 * day)))
            .equals('1 day ago');
    },
    async "23 hours ago should show '23 hours ago'"() {
        expect(howLongAgo(Date.now() - (23 * hour)))
            .equals('23 hours ago');
    },
    async "25 hours ago should show '1 day ago'"() {
        expect(howLongAgo(Date.now() - (25 * hour)))
            .equals('1 day ago');
    },
    async "24 hours ago should show '1 day ago'"() {
        expect(howLongAgo(Date.now() - (24 * hour)))
            .equals('1 day ago');
    },
};
//# sourceMappingURL=how-long-ago.test.js.map