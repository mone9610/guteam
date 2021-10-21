// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
// railsから取得するオブジェクトのプロパティはキャメルケースのため、無効化
/* eslint-disable camelcase */
import { VFC } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { processDate } from 'common/customFunctions';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
  title?: string;
  description?: string;
  owner?: string;
  community_id?: number;
  picture_url?: string;
  created_at: string;
  updated_at?: string;
};

const Thread: VFC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    key,
    title,
    description,
    owner,
    community_id,
    picture_url,
    created_at,
    updated_at,
  } = props;

  return (
    <div>
      <>
        <ListItem
          button
          key={key}
          onClick={() => history.push(`/client/community/1/${key}`)}
        >
          <ListItemAvatar>
            <Avatar alt="" src={picture_url} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  xxx 投稿
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
                  {title}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {processDate(created_at)} {owner}により作成
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

export default Thread;
