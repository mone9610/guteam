import { VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import NotificationItemList from 'presentational/template/NotificationItemList';

// 開発環境のみ利用
import { notificationData, userData } from 'data/notification';
import { NotificationData } from 'common/CustomTypes';

const Timeline: VFC = () => {
  // ToDo:dispatchとtitleの更新を共通化できないか検討
  const dispatch = useDispatch();

  const pageTitle = 'お知らせ';
  const updateTitle = () => {
    dispatch(setTitle(pageTitle));
  };
  void updateTitle();

  return (
    <div>
      <NotificationItemList
        notificationItems={notificationData as NotificationData[]}
        users={userData}
        isLoading={false}
      />
    </div>
  );
};

export default Timeline;
