export declare type Validator<xValue> = (value: xValue) => string[];
export declare function validator<xValue>(...conditions: Validator<xValue>[]): Validator<xValue>;
export declare function multi<xValue>(...conditions: Validator<xValue>[]): Validator<xValue>;
export declare function schema<xObject extends {}>(schematic: {
    [P in keyof xObject]: Validator<xObject[P]>;
}): Validator<xObject>;
export declare function branch<xValue>(...conditions: Validator<xValue>[]): Validator<xValue>;
export declare function optional<xValue>(...conditions: Validator<any>[]): Validator<xValue>;
export declare function each<xValue>(...conditions: Validator<xValue>[]): Validator<xValue[]>;
export declare function objectValues<xValue>(...conditions: Validator<xValue>[]): Validator<{
    [key: string]: xValue;
}>;
export declare const is: <X>(x: X) => Validator<X>;
export declare const defined: () => Validator<any>;
export declare const notDefined: () => Validator<undefined>;
export declare const string: () => Validator<string>;
export declare const number: () => Validator<number>;
export declare const boolean: () => Validator<boolean>;
export declare const object: () => Validator<{}>;
export declare const min: (threshold: number) => Validator<number>;
export declare const max: (threshold: number) => Validator<number>;
export declare const array: () => Validator<any[]>;
export declare const length: (len: number) => Validator<{
    length: number;
}>;
export declare const minLength: (min: number) => Validator<{
    length: number;
}>;
export declare const maxLength: (max: number) => Validator<{
    length: number;
}>;
export declare const notAllWhitespace: () => Validator<string>;
export declare const zeroWhitespace: () => Validator<string>;
export declare const url: () => Validator<string>;
export declare const localhost: () => Validator<string>;
export declare const https: () => Validator<string>;
export declare const origin: () => Validator<string>;
export declare const regex: (r: RegExp, problem?: string) => Validator<string>;
export declare const email: () => Validator<string>;
