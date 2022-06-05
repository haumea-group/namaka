export declare const hitch: {
    before<F extends (...args: any[]) => any>(func1: F, func2: () => void): F;
    after<F_1 extends (...args: any[]) => any>(func1: F_1, func2: () => void): F_1;
};
