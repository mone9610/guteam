/* eslint-disable  camelcase */
import { SnackbarState } from 'common/features/snackbarSlice';
import { TitleState } from 'common/features/pageTitleSlice';
import { ProgressState } from 'common/features/progressSlice';
import { ReloadState } from 'common/features/reloadSlice';
import { AccordionState } from 'common/features/accordionSlice';
import { ProfileModalState } from './features/profileModalSlice';

export type UserType = {
  id: number;
  name: string;
  sub: string;
  introduction: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type PostType = {
  id: number;
  user_id: number;
  message: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type NotificationType = {
  id: number;
  message: string;
  from_user_id: number;
  to_user_id: number;
  created_at: string;
  updated_at: string;
};

export type StoreType = {
  snackbar?: SnackbarState;
  title?: TitleState;
  progress?: ProgressState;
  reload?: ReloadState;
  profileModal?: ProfileModalState;
  accordion?: AccordionState;
};

export type CommunityType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type ThreadType = {
  id: number;
  community_id: number;
  user_id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type ThreadPostType = PostType & {
  community_thread_id: number;
};

export type {};
