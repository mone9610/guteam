import { VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import Post from '../organisms/Post';
import PostEnd from '../organisms/PostEnd';
import ClientFooter from '../organisms/ClientFooter';

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
      <Post />
      <PostEnd />
      <ClientFooter />
    </div>
  );
};

export default Timeline;
