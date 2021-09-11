export type User = {
  id: number;
  name: string;
  sub: string;
  introduction: string;
  // eslint-disable-next-line camelcase
  picture_url: string;
};

export type Post = {
  id: number;
  // eslint-disable-next-line camelcase
  user_id: number;
  message: string;
  // eslint-disable-next-line camelcase
  is_deleted: boolean;
  // eslint-disable-next-line camelcase
  created_at: string;
};

export type {};
