export interface ResponseData<T> {
    err: number;
    msg: string;
    dt: T;
}