
export type QueryType = RegExp | Function | null;

export interface TransFormFunctionQuery {
    include?: QueryType,
    exclude?: QueryType
}
export type TransFormFunction<T> = (query?: TransFormFunctionQuery) => T