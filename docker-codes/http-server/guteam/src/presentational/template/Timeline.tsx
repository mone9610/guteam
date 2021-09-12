import { VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import PostList from 'presentational/template/PostList';
import ClientFooter from 'presentational/organisms/ClientFooter';

const postData = [
  {
    id: 1,
    user_id: 2,
    message: '最初の投稿。',
    is_deleted: false,
    created_at: '2021-09-11T01:42:13.094Z',
    updated_at: '2021-09-11T01:42:13.094Z',
  },
  {
    id: 2,
    user_id: 1,
    message: '２番目の投稿',
    is_deleted: false,
    created_at: '2021-09-12T01:42:13.094Z',
    updated_at: '2021-09-12T01:42:13.094Z',
  },
  {
    id: 3,
    user_id: 3,
    message: '今日は12時間働いた',
    is_deleted: true,
    created_at: '2021-09-13T01:42:13.094Z',
    updated_at: '2021-09-13T01:42:13.094Z',
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
    id: 2,
    name: 'テストユーザー',
    sub: 'gkRHoBnR8YJq1oJcmdLtPTi9Sf2Mrn4R@clients',
    introduction: 'こんにちわん',
    created_at: '2021-09-11T01:42:13.064Z',
    updated_at: '2021-09-11T01:42:13.064Z',
    picture_url:
      'https://user-images.githubusercontent.com/64692797/131617276-b5222ddb-25ac-4877-93d6-7e5432229512.jpg',
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
      <ClientFooter />
    </div>
  );
};

export default Timeline;
