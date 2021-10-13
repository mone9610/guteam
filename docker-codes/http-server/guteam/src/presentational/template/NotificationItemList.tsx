// no-unsafe-member-accessを無効化：any型にメンバーアクセスはあてていないが勝手に起動するため
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
import { VFC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { NotificationData, User } from 'common/CustomTypes';
import Spinner from 'presentational/molecules/Spinner';
import NotificationItem from 'presentational/organisms/NotificationItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80vw',
    },
    txt: {
      margin: theme.spacing(2),
    },
  })
);

type Props = {
  notificationItems: NotificationData[];
  users: User[];
  isLoading: boolean;
};

const NotificationItemList: VFC<Props> = (props) => {
  const classes = useStyles();
  const { notificationItems, users, isLoading } = props;

  // created_atで降順にソートする
  notificationItems?.sort((a: NotificationData, b: NotificationData) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 1;
  });

  return (
    <div>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <List className={classes.root}>
            {notificationItems?.map((notificationItem) => {
              const found = users?.find(
                (user) => notificationItem.from_user_id === user.id
              );
              return (
                <NotificationItem
                  key={notificationItem.id}
                  sub={found?.sub as string}
                  picture_url={found?.picture_url as string}
                  message={notificationItem.message}
                  created_at={notificationItem.created_at}
                />
              );
            })}
          </List>
        </>
      )}
    </div>
  );
};

export default NotificationItemList;
