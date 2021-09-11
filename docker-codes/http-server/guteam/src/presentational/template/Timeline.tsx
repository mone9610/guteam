import { VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import PostList from 'presentational/template/PostList';
import PostEnd from 'presentational/organisms/PostEnd';
import ClientFooter from 'presentational/organisms/ClientFooter';
import Post from '../organisms/Post';

const postData = [
  {
    id: 2,
    user_id: 4,
    message: '123456',
    is_deleted: false,
    created_at: '2021-09-11T01:42:13.094Z',
    updated_at: '2021-09-11T01:42:13.094Z',
  },
  {
    id: 3,
    user_id: 1,
    message: '7890123',
    is_deleted: true,
    created_at: '2021-09-11T01:42:13.094Z',
    updated_at: '2021-09-11T01:42:13.094Z',
  },
];

const userData = [
  {
    id: 1,
    name: 'ほげほげまん',
    sub: 'hogehogehoge',
    introduction: 'こんにちは',
    created_at: '2021-09-09T09:20:53.133Z',
    updated_at: '2021-09-09T09:20:53.133Z',
    picture_url:
      'https://guteam-test-20210819.s3.ap-northeast-1.amazonaws.com/profile/test/1630987272522.png',
  },
  {
    id: 4,
    name: 'テストユーザー',
    sub: 'gkRHoBnR8YJq1oJcmdLtPTi9Sf2Mrn4R@clients',
    introduction: 'こんにちわん',
    created_at: '2021-09-11T01:42:13.064Z',
    updated_at: '2021-09-11T01:42:13.064Z',
    picture_url:
      'https://guteam-test-20210819.s3.ap-northeast-1.amazonaws.com/profile/test/1630987272522.png',
  },
];

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
      今、かかえている愚痴をつぶやいてみましょう！
      {/* <Post /> */}
      <PostList posts={postData} users={userData} isLoading={false} />
      <PostEnd />
      <ClientFooter />
    </div>
  );
};

export default Timeline;
