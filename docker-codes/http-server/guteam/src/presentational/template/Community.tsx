import { VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setTitle } from 'common/features/pageTitleSlice';
import ThreadList from 'presentational/organisms/ThreadList';

import { ThreadData } from 'common/CustomTypes';

// 開発環境のみ利用
// import communityThreadsData from 'data/community_threads';
// import { postData, userData } from 'data/timeline';
// import PostList from './PostList';

const Community: VFC = () => {
  // ToDo:dispatchとtitleの更新を共通化できないか検討
  const dispatch = useDispatch();
  const { communityid, threadid } =
    useParams<{ communityid: string; threadid: string }>();
  const pageTitle = 'コミュニティ';
  const updateTitle = () => {
    dispatch(setTitle(pageTitle));
  };
  void updateTitle();

  return (
    <div>
      {/* {communityid && threadid ? (
        仮置き
        <PostList posts={postData} users={userData} isLoading={false} />
      ) : (
        <ThreadList threads={communityThreadsData} isLoading={false} />
      )} */}
    </div>
  );
};

export default Community;
