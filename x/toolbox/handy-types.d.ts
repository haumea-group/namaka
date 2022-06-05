export declare type Await<P> = P extends Promise<infer Value> ? Value : never;
export declare type Constructor<T extends {} = {}> = new (...args: any[]) => T;
