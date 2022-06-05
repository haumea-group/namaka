export const hitch = {
    before(func1, func2) {
        return ((...args) => {
            func2();
            return func1(...args);
        });
    },
    after(func1, func2) {
        return ((...args) => {
            const result = func1(...args);
            func2();
            return result;
        });
    },
};
//# sourceMappingURL=hitch.js.map