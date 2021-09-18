import { SnackbarState } from 'common/features/snackbarSlice';
import { TitleState } from 'common/features/pageTitleSlice';
import { ProgressState } from 'common/features/progressSlice';
import { ReloadState } from 'common/features/reloadSlice';

export type User = {
  id: number;
  name: string;
  sub: string;
  introduction: string;
  // eslint-disable-next-line camelcase
  picture_url: string;
};

export type PostData = {
  id: number;
  // eslint-disable-next-line camelcase
  user_id: number;
  message: string;
  // eslint-disable-next-line camelcase
  is_deleted: boolean;
  // eslint-disable-next-line camelcase
  created_at: string;
  // eslint-disable-next-line camelcase
  updated_at: string;
};

export type Message = {
  message: string;
};

export type Store = {
  snackbar?: SnackbarState;
  title?: TitleState;
  progress?: ProgressState;
  reload?: ReloadState;
};

export type {};
