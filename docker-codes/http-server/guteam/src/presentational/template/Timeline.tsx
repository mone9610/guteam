import { VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import PostList from 'presentational/template/PostList';
import ClientFooter from 'presentational/organisms/ClientFooter';
// 開発環境のみ利用
import { postData, userData } from 'data/data';

const Timeline: VFC = () => {
  // ToDo:dispatchとtitleの更新を共通化できないか検討
  const pageTitle = 'タイムライン';
  const dispatch = useDispatch();
  const updateTitle = () => {
    dispatch(setTitle(pageTitle));
  };
  void updateTitle();

  return (
    <div>
      <PostList posts={postData} users={userData} isLoading={false} />
      <ClientFooter />
    </div>
  );
};

export default Timeline;
