/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ThreadPostList from 'presentational/template/ThreadPostList';
import { User, ThreadPostData } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import { getThreadPost, getUsers } from 'common/customFunctions';

import { ProgressState, setProgress } from 'common/features/progressSlice';
import { ReloadState, setReload } from 'common/features/reloadSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';
import CommunityClientFooter from 'presentational/organisms/CommunityClientFooter';

const ExtendedThreadPostList: VFC = () => {
  const token = useToken();
  const { threadid } = useParams<{ threadid: string }>();

  const [users, setUsers] = useState<User[]>();
  const [threadPosts, setThreadPosts] = useState<ThreadPostData[]>();

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
          void getThreadPost(token, threadid)
            .then((tp) => {
              setThreadPosts(tp);
            })
            .then(() => {
              updateProgress(false);
              updateReload(false);
            })
            .catch(() => {
              updateProgress(false);
              updateReload(false);
            });
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
    }
  }, [token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, reloadJson]);

  return (
    <>
      <ThreadPostList
        // threadInfo={}
        posts={threadPosts as ThreadPostData[]}
        users={users as User[]}
        isLoading={Object.values(progressJson)[0] as boolean}
      />
      <CommunityClientFooter />
    </>
  );
};

export default ExtendedThreadPostList;
