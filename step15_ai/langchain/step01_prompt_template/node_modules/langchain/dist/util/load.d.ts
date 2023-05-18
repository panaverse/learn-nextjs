export type LoadValues = Record<string, any>;
export type FileLoader<T> = (text: string, filePath: string, values: LoadValues) => Promise<T>;
export declare const loadFromFile: <T>(uri: string, loader: FileLoader<T>, values?: LoadValues) => Promise<T>;
