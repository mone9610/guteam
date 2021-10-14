/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { User, NotificationData } from 'common/CustomTypes';
import { useToken } from 'common/CustomHooks';
import {
  absSubFromUserID,
  getNotifications,
  getUsers,
  getUser,
} from 'common/customFunctions';

import { ProgressState, setProgress } from 'common/features/progressSlice';
import { useAuth0 } from '@auth0/auth0-react';
import NotificationItemList from 'presentational/template/NotificationItemList';

const ExtendedNotificationItemList: VFC = () => {
  const token = useToken();
  const { user } = useAuth0();
  const rawSub = user?.sub as string;
  const sub: string = absSubFromUserID(rawSub);

  const [currentUser, setCurrentUser] = useState<User>();
  const [users, setUsers] = useState<User[]>();
  const [notifications, setNotifications] = useState<NotificationData[]>();

  const dispatch = useDispatch();
  const progressJson = useSelector((state: ProgressState) => state.progress);

  const updateProgress = (state: boolean) => {
    dispatch(setProgress(state));
  };

  const load = useCallback(() => {
    if (token) {
      void getUser(token, sub).then((u) => {
        setCurrentUser(u);
      });
      if (currentUser?.id) {
        void getUsers(token).then((us) => {
          setUsers(us);
        });
        void getNotifications(token, currentUser?.id)
          .then((ns) => {
            setNotifications(ns);
          })
          .then(() => {
            updateProgress(false);
          });
      }
    }
  }, [token, currentUser?.id]);

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token, currentUser?.id]);

  return (
    <NotificationItemList
      notificationItems={notifications as NotificationData[]}
      users={users as User[]}
      isLoading={Object.values(progressJson)[0] as boolean}
    />
  );
};

export default ExtendedNotificationItemList;
