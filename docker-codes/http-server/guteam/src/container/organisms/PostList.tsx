/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostList from 'presentational/template/PostList';
import { User, PostData } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import { getPosts, getUsers } from 'common/customFunctions';

import { ProgressState, setProgress } from 'common/features/progressSlice';
import { ReloadState, setReload } from 'common/features/reloadSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';

const ExtendedPostList: VFC = () => {
  const token = useToken();
  const [users, setUsers] = useState<User[]>();
  const [posts, setPosts] = useState<PostData[]>();

  const dispatch = useDispatch();
  const progressJson = useSelector((state: ProgressState) => state.progress);
  const reloadJson = useSelector((state: ReloadState) => state.reload);

  const updateProgress = (state: boolean) => {
    dispatch(setProgress(state));
  };

  const updateReload = (state: boolean) => {
    dispatch(setReload(state));
  };

  const load = useCallback(() => {
    if (token) {
      void getUsers(token)
        .then((us) => {
          setUsers(us);
        })
        .then(() => {
          void getPosts(token)
            .then((ps) => {
              setPosts(ps);
            })
            .then(() => {
              updateProgress(false);
              updateReload(false);
            })
            .catch(() => {
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
            });
        });
    }
  }, [token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, reloadJson]);

  return (
    <PostList
      posts={posts as PostData[]}
      users={users as User[]}
      isLoading={Object.values(progressJson)[0] as boolean}
    />
  );
};

export default ExtendedPostList;
