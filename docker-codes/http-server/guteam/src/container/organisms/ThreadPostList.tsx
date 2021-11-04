/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ThreadPostList from 'presentational/template/ThreadPostList';
import { UserType, ThreadPostType, ThreadType } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import {
  getThreadPosts,
  getUsers,
  getCommunityThread,
} from 'common/customFunctions';

import { ProgressState, setProgress } from 'common/features/progressSlice';
import { ReloadState, setReload } from 'common/features/reloadSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';
import CommunityClientFooter from 'presentational/organisms/CommunityClientFooter';

const ExtendedThreadPostList: VFC = () => {
  const token = useToken();
  const { threadid } = useParams<{ threadid: string }>();

  const [users, setUsers] = useState<UserType[]>();
  const [threadPosts, setThreadPosts] = useState<ThreadPostType[]>();
  const [threadInfo, setThreadInfo] = useState<ThreadType>();

  const dispatch = useDispatch();
  const progressJson = useSelector((state: ProgressState) => state.progress);
  const reloadJson = useSelector((state: ReloadState) => state.reload);

  const updateProgress = (state: boolean) => {
    dispatch(setProgress(state));
  };

  const updateReload = (state: boolean) => {
    dispatch(setReload(state));
  };

  const load = useCallback(async () => {
    if (token) {
      try {
        const ct = await getCommunityThread(token, threadid);
        setThreadInfo(ct);
      } catch {
        updateProgress(false);
        updateReload(false);
        dispatch(
          setSnackbarState({
            open: true,
            type: 'error',
            message:
              'データの取得に失敗しました。しばらく時間をおいて再試行してください。',
          })
        );
      }
      try {
        const us = await getUsers(token);
        setUsers(us);
        const tps = await getThreadPosts(token, threadid);
        setThreadPosts(tps);
        updateProgress(false);
        updateReload(false);
      } catch {
        updateProgress(false);
        updateReload(false);
      }
    }
  }, [token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, reloadJson]);

  return (
    <>
      <ThreadPostList
        threadInfo={threadInfo as ThreadType}
        posts={threadPosts as ThreadPostType[]}
        users={users as UserType[]}
        isLoading={Object.values(progressJson)[0] as boolean}
      />
      <CommunityClientFooter />
    </>
  );
};

export default ExtendedThreadPostList;
