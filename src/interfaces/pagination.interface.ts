export interface PaginationResult<T> {
    data: Array<T>,
    pageSize: number,
    total: number,
    currentPage: number,
    previousPage?: number,
    nextPage?: number
}