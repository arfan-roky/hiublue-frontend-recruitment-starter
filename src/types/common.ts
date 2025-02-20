export type Link = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};
export type MetaLink = {
  active: boolean;
  label: string;
  url: string | null;
};
export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type Result<TData> = {
  data: TData[];
  meta: Meta;
  links: Link;
};
