/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostList from 'presentational/template/PostList';
import { User, PostData } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import { getPosts, getUsers } from 'common/customFunctions';

import { ProgressState, setProgress } from 'common/features/progressSlice';
import { ReloadState, setReload } from 'common/features/reloadSlice';

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
      void getUsers(token).then((us) => {
        setUsers(us);
      });
      void getPosts(token)
        .then((ps) => {
          setPosts(ps);
        })
        .then(() => {
          updateProgress(false);
          updateReload(false);
        });
    }
  }, [token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, reloadJson]);

  return (
    <PostList
      // ToDo: 型ガードを入れる
      posts={posts!}
      users={users!}
      //   HACK:pJsonから取得する値はboolean型である sliceにて保証しているため、安全でない型定義を許容する
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isLoading={Object.values(progressJson)[0]}
    />
  );
};

export default ExtendedPostList;
