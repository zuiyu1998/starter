export type PageListResponse<T> = {
  data: T[];
  has_next: boolean;
  page_size: number;
  page: number;
};
