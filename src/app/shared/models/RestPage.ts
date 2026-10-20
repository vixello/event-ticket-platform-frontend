export interface RestPage<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: any;
    };
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}