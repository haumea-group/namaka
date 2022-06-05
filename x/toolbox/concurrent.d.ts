export declare type Await<T> = T extends Promise<infer U> ? U : T;
export declare type AwaitProps<T> = {
    [P in keyof T]: Await<T[P]>;
};
export declare type PromisedProps<T> = {
    [P in keyof T]: T[P] | Promise<T[P]>;
};
export declare function concurrent<T>(obj: T): Promise<AwaitProps<T>>;
