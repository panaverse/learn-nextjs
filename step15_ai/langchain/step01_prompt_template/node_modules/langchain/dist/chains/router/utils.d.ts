export declare function zipEntries<T extends any[]>(...arrays: {
    [P in keyof T]: T[P][];
}): T[];
