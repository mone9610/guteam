// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
// railsから取得するオブジェクトのプロパティはキャメルケースのため、無効化
/* eslint-disable camelcase */
import { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { processDate } from 'common/customFunctions';
import CustomListAvatar from 'container/molecules/CustomListAvatar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '80vw',
    },
    inline: {
      display: 'inline',
    },
  })
);

type Props = {
  key: number;
  sub: string;
  picture_url: string;
  message: string;
  created_at: string;
};

const NotificationItem: VFC<Props> = (props) => {
  const classes = useStyles();
  const { key, sub, picture_url, message, created_at } = props;

  return (
    <div>
      <>
        <ListItem key={key}>
          <CustomListAvatar sub={sub} picture_url={picture_url} />
          <ListItemText
            primary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {message}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {processDate(created_at)}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    </div>
  );
};

export default NotificationItem;
