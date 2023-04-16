export enum FilterToken {
  EQUAL = "eq",
  NOT_EQUAL = "neq",
  INCLUDE = "in",
  NOT_INCLUDE = "not_in",
  EXISTS = "exists",
  NOT_EXISTS = "not_exists",
  LIKE = "like",
  GREATER_THAN = "gt",
  LESS_THAN = "lt",
  GREATER_THAN_EQUAL_TO = "gte",
  LESS_THAN_EQUAL_TO = "lte",
}

export type Filter = {
  key: string;
  op: FilterToken;
  value: string | string[] | RegExp;
};

export type PaginationParameters = {
  limit: number;
  page: number;
  offset: number;
};

export type SortParams = {
  sortBy: string;
  sortDirection: "ASC" | "DESC";
};

export type GetAllParams = Partial<
  PaginationParameters & SortParams & Record<"filters", Filter[]>
>;

export type PaginatedResponse<T> = Record<string, T[]> &
  PaginationParameters & {
    pages: number;
    total: number;
  };

export interface IResource<T> {
  getOne: (id: string) => Promise<T>;
  getAll: (opts?: GetAllParams) => Promise<PaginatedResponse<T>>;
}
