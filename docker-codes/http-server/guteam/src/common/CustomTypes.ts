/* eslint-disable  camelcase */
import { SnackbarState } from 'common/features/snackbarSlice';
import { TitleState } from 'common/features/pageTitleSlice';
import { ProgressState } from 'common/features/progressSlice';
import { ReloadState } from 'common/features/reloadSlice';
import { AccordionState } from 'common/features/accordionSlice';
import { ProfileModalState } from './features/profileModalSlice';

export type User = {
  id?: number;
  name: string;
  sub: string;
  introduction: string;
  picture_url: string;
  created_at?: string;
  updated_at?: string;
};

export type PostData = {
  id: number;
  user_id: number;
  message: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type NotificationData = {
  id: number;
  message: string;
  from_user_id: number;
  to_user_id: number;
  created_at: string;
  updated_at: string;
};

export type ThreadData = {
  id: number;
  title: string;
  description: string;
  owner: string;
  community_id: number;
  picture_url: string;
  created_at: string;
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
  profileModal?: ProfileModalState;
  accordion?: AccordionState;
};

export type {};
