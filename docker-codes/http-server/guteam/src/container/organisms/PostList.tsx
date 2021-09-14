/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostList from 'presentational/template/PostList';
import { User, PostData } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import { getPostData, getUsers } from 'common/customFunctions';

import { ProgressState, setProgress } from 'common/features/progressSlice';

const ExtendedPostList: VFC = () => {
  const token = useToken();
  const [users, setUsers] = useState<User[]>();
  const [posts, setPosts] = useState<PostData[]>();

  const dispatch = useDispatch();
  const pJson = useSelector((state: ProgressState) => state.progress);

  const updateProgress = (state: boolean) => {
    dispatch(setProgress(state));
  };

  const load = useCallback(() => {
    if (token) {
      void getUsers(token).then((us) => {
        setUsers(us);
      });
      void getPostData(token)
        .then((ps) => {
          setPosts(ps);
        })
        .then(() => {
          updateProgress(false);
        });
    }
  }, [token]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token]);

  return (
    <PostList
      posts={posts!}
      users={users!}
      //   HACK:pJsonから取得する値はboolean型である sliceにて保証しているため、安全でない型定義を許容する
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isLoading={Object.values(pJson)[0]}
    />
  );
};

export default ExtendedPostList;
