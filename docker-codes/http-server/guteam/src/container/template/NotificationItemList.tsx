/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserType, NotificationType } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import {
  absSubFromUserID,
  getNotifications,
  getUsers,
  getUser,
} from 'common/customFunctions';
import { setSnackbarState } from 'common/features/snackbarSlice';
import { ProgressState, setProgress } from 'common/features/progressSlice';
import { useAuth0 } from '@auth0/auth0-react';
import NotificationItemList from 'presentational/template/NotificationItemList';

const ExtendedNotificationItemList: VFC = () => {
  const token = useToken();
  const { user } = useAuth0();
  const rawSub = user?.sub as string;
  const sub: string = absSubFromUserID(rawSub);

  const [currentUser, setCurrentUser] = useState<UserType>();
  const [users, setUsers] = useState<UserType[]>();
  const [notifications, setNotifications] = useState<NotificationType[]>();

  const dispatch = useDispatch();
  const progressJson = useSelector((state: ProgressState) => state.progress);

  const updateProgress = (state: boolean) => {
    dispatch(setProgress(state));
  };

  const load = useCallback(async () => {
    if (token) {
      try {
        const u = await getUser(token, sub);
        setCurrentUser(u);
      } catch {
        dispatch(
          setSnackbarState({
            open: true,
            type: 'error',
            message:
              'データの取得に失敗しました。しばらく時間をおいて再試行してください。',
          })
        );
        updateProgress(false);
      }

      if (currentUser?.id) {
        try {
          const us = await getUsers(token);
          setUsers(us);
          const ns = await getNotifications(token, currentUser?.id);
          setNotifications(ns);
          updateProgress(false);
        } catch {
          updateProgress(false);
        }
      }
    }
  }, [token, currentUser?.id]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, currentUser?.id]);

  return (
    <NotificationItemList
      notificationItems={notifications as NotificationType[]}
      users={users as UserType[]}
      isLoading={Object.values(progressJson)[0] as boolean}
    />
  );
};

export default ExtendedNotificationItemList;
