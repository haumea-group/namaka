export function validator(...conditions) {
    return value => {
        let problems = [];
        for (const condition of conditions) {
            problems = condition(value);
            if (problems.length > 0)
                break;
        }
        return problems;
    };
}
export function multi(...conditions) {
    return value => {
        const problems = [];
        for (const condition of conditions) {
            for (const problem of condition(value))
                problems.push(problem);
        }
        return problems;
    };
}
export function schema(schematic) {
    const schematicKeys = Object.keys(schematic);
    return object => (Object.entries(object).flatMap(([key, value]) => schematicKeys.includes(key)
        ? schematic[key](value)
            .map(problem => `"${key}": ${problem}`)
        : [`"${key} not in schema"`]));
}
export function branch(...conditions) {
    return value => {
        const results = conditions.map(condition => condition(value));
        let anySuccess = false;
        for (const problems of results)
            if (problems.length === 0)
                anySuccess = true;
        return anySuccess
            ? []
            : results.flat()
                .map((problem, index) => index > 0 ? `or, ${problem}` : problem);
    };
}
export function optional(...conditions) {
    return branch(validator(notDefined()), ...conditions);
}
export function each(...conditions) {
    return arr => {
        if (!Array.isArray(arr))
            return ["must be array"];
        const validate = validator(...conditions);
        const problems = [];
        arr.forEach((item, index) => {
            for (const problem of validate(item))
                problems.push(`(${index + 1}) ${problem}`);
        });
        return problems;
    };
}
export function objectValues(...conditions) {
    return obj => {
        if (typeof obj !== "object" || obj === undefined || obj === null)
            return ["must be object"];
        const validate = validator(...conditions);
        const problems = [];
        for (const [key, value] of Object.entries(obj))
            for (const problem of validate(value))
                problems.push(`(${key}) ${problem}`);
        return problems;
    };
}
export const is = (x) => value => value === x
    ? []
    : ["wrong value"];
export const defined = () => value => (value === undefined || value === null)
    ? ["must be defined (not undefined or null)"]
    : [];
export const notDefined = () => value => (value !== undefined && value !== null)
    ? ["must be undefined or null"]
    : [];
export const string = () => value => typeof value !== "string"
    ? ["must be a string"]
    : [];
export const number = () => value => typeof value !== "number"
    ? ["must be a number"]
    : [];
export const boolean = () => value => typeof value !== "boolean"
    ? ["must be a boolean"]
    : [];
export const object = () => value => typeof value !== "object" || value === undefined || value === null
    ? ["must be an object"]
    : [];
export const min = (threshold) => value => value < threshold
    ? ["too small"]
    : [];
export const max = (threshold) => value => value > threshold
    ? ["too big"]
    : [];
export const array = () => value => Array.isArray(value)
    ? []
    : ["must be an array"];
export const length = (len) => value => value.length !== len
    ? [`length must be ${len}`]
    : [];
export const minLength = (min) => value => value.length < min
    ? ["too small"]
    : [];
export const maxLength = (max) => value => value.length > max
    ? ["too big"]
    : [];
export const notAllWhitespace = () => value => value.length > 0 && value.trim().length === 0
    ? ["can't be all whitespace"]
    : [];
export const zeroWhitespace = () => value => /\s/.test(value)
    ? ["must not have any spaces"]
    : [];
export const url = () => value => {
    try {
        void new URL(value);
        return [];
    }
    catch (error) {
        return ["invalid url"];
    }
};
export const localhost = () => value => {
    return /^https?:\/\/(127\.0\.0\.1|localhost)(|:\d{1,5})(|\/\S*)$/i.test(value)
        ? []
        : ["must be a localhost address"];
};
export const https = () => value => {
    return /^https:\/\//i.test(value)
        ? []
        : ["must be secure, starting with 'https'"];
};
export const origin = () => value => /^https?:\/\/[a-zA-Z\.\d-]+(?:|:\d+)$/i.test(value)
    ? []
    : ["invalid origin"];
export const regex = (r, problem = "invalid string") => value => r.test(value)
    ? []
    : [problem];
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const email = () => value => emailRegex.test(value)
    ? []
    : ["invalid email"];
//# sourceMappingURL=darkvalley.js.map