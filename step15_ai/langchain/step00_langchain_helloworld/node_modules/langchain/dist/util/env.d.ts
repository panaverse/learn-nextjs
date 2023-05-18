declare global {
    const Deno: {
        version: {
            deno: string;
        };
    } | undefined;
}
export declare const isBrowser: () => boolean;
export declare const isWebWorker: () => boolean;
export declare const isJsDom: () => boolean;
export declare const isDeno: () => boolean;
export declare const isNode: () => boolean;
export declare const getEnv: () => string;
export type RuntimeEnvironment = {
    library: string;
    libraryVersion?: string;
    runtime: string;
    runtimeVersion?: string;
};
export declare function getRuntimeEnvironment(): Promise<RuntimeEnvironment>;
