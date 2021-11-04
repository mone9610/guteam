/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostList from 'presentational/template/PostList';
import { UserType, PostType } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import { getPosts, getUsers } from 'common/customFunctions';

import { ProgressState, setProgress } from 'common/features/progressSlice';
import { ReloadState, setReload } from 'common/features/reloadSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';

const ExtendedPostList: VFC = () => {
  const token = useToken();
  const [users, setUsers] = useState<UserType[]>();
  const [posts, setPosts] = useState<PostType[]>();

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
        const us = await getUsers(token);
        setUsers(us);
        const ps = await getPosts(token);
        setPosts(ps);
        updateProgress(false);
        updateReload(false);
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
    }
  }, [token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, reloadJson]);

  return (
    <PostList
      posts={posts as PostType[]}
      users={users as UserType[]}
      isLoading={Object.values(progressJson)[0] as boolean}
    />
  );
};

export default ExtendedPostList;
