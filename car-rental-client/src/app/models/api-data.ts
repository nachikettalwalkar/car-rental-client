export interface APIData<T> {
    status: string;
    data: T;
    metadata?: T;
    links?: T;
}
