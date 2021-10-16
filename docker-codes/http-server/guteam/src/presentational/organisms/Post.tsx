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

import moment from 'moment';
import 'moment/locale/ja';

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
  sub?: string;
  picture_url?: string;
  name?: string;
  message: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
};

const Post: VFC<Props> = (props) => {
  const classes = useStyles();
  const {
    key,
    sub,
    picture_url,
    name,
    message,
    created_at,
    updated_at,
    is_deleted,
  } = props;

  return (
    <div>
      <>
        <ListItem alignItems="flex-start" key={key}>
          <CustomListAvatar sub={sub} picture_url={picture_url} />
          <ListItemText
            primary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {name}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {is_deleted ? 'この投稿は削除されました。' : message}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {is_deleted
                    ? moment(updated_at).fromNow()
                    : moment(created_at).fromNow()}
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

export default Post;
