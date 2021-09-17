/* eslint-disable @typescript-eslint/no-unsafe-return */
import { VFC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import ExtendedPostList from 'container/organisms/PostList';
import ClientFooter from 'presentational/organisms/ClientFooter';

// 開発環境のみ利用
import { postData, userData } from 'data/data';

const Timeline: VFC = () => {
  // ToDo:dispatchとtitleの更新を共通化できないか検討
  const dispatch = useDispatch();

  const pageTitle = 'タイムライン';
  const updateTitle = () => {
    dispatch(setTitle(pageTitle));
  };
  void updateTitle();

  return (
    <div>
      <ExtendedPostList />
      <ClientFooter />
    </div>
  );
};

export default Timeline;
