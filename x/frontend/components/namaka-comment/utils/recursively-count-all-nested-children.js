export function recursivelyCountAllNestedChildren(comment) {
    let sum = comment.children.length;
    for (const childComment of comment.children)
        sum += recursivelyCountAllNestedChildren(childComment);
    return sum;
}
//# sourceMappingURL=recursively-count-all-nested-children.js.map