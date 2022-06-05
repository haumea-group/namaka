export declare type AnyFunction = (...args: any[]) => any;
export declare type DebounceReturn<xAction extends AnyFunction> = (...args: Parameters<xAction>) => ReturnType<xAction> extends Promise<any> ? ReturnType<xAction> : Promise<ReturnType<xAction>>;
