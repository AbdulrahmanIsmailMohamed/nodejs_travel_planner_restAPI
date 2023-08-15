import { QueryResultRow } from "pg";
import { pool } from "../db/connect";
import { PaginationResult } from "../interfaces/pagination.interface";

export const paginate = async <T>(
  page: number,
  pageSize: number,
  query: string,
  value: Array<any>
): Promise<PaginationResult<T>> => {
  try {
    const offset = (page - 1) * pageSize;
    const countQuery = `SELECT COUNT(*) FROM (${query}) as subquery;`;
    const dataQuery = `${query} LIMIT ${pageSize} OFFSET ${offset};`;
    const endIndex = page * pageSize;

    const [countDocument, dataResult] = await Promise.all([
      pool.query<{ count: number }>(countQuery, value),
      pool.query<QueryResultRow>(dataQuery, value)
    ]);

    const total = countDocument.rows[0].count;

    const paginationResult: PaginationResult<T> = {
      total,
      data: dataResult.rows as T[],
      currentPage: page,
      pageSize: pageSize,
      nextPage: endIndex < total ? page + 1 : undefined,
      previousPage: offset > 0 ? page - 1 : undefined
    }

    return paginationResult

  } catch (error) {
    throw error;
  }

}

/*
  current page = page,
  limit = pageSize,
  endIndex = page * limit;
  nextPage = if endIndex < total => nextPage = page + 1
  previousPage = if offset > 0 => previousPage = page - 1
*/