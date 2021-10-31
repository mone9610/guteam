import { VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import ExtendedNotificationItemList from 'container/template/NotificationItemList';

// // 開発環境のみ利用
// import { notificationData, userData } from 'data/notification';
// import { NotificationData } from 'common/CustomTypes';

const Timeline: VFC = () => {
  const dispatch = useDispatch();

  const pageTitle = 'お知らせ';
  const updateTitle = () => {
    dispatch(setTitle(pageTitle));
  };
  void updateTitle();

  return (
    <div>
      <ExtendedNotificationItemList />
    </div>
  );
};

export default Timeline;
