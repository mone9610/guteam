import { VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setTitle } from 'common/features/pageTitleSlice';
import ExtendedThreadList from 'container/organisms/ThreadList';
import ExtendedThreadPostList from 'container/organisms/ThreadPostList';

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
      {communityid && threadid ? (
        <ExtendedThreadPostList />
      ) : (
        <ExtendedThreadList />
      )}
    </div>
  );
};

export default Community;
