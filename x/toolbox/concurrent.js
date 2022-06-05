export async function concurrent(obj) {
    const keys = Object.keys(obj);
    const awaitables = Object.values(obj);
    const values = await Promise.all(awaitables);
    const result = {};
    keys.forEach((key, index) => result[key] = values[index]);
    return result;
}
//# sourceMappingURL=concurrent.js.map