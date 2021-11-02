// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
// railsから取得するオブジェクトのプロパティはキャメルケースのため、無効化
/* eslint-disable camelcase */
import { VFC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { ThreadType } from 'common/CustomTypes';
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

type Props = Pick<
  ThreadType,
  'id' | 'community_id' | 'title' | 'image_url' | 'created_at'
>;

const Thread: VFC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { communityid } = useParams<{ communityid: string }>();
  const { id, title, image_url, created_at } = props;
  const initialThumbnail = process.env.REACT_APP_INITIAL_THUMBNAIL;

  return (
    <div>
      <>
        <ListItem
          button
          key={id}
          onClick={() => history.push(`/client/community/${communityid}/${id}`)}
        >
          <ListItemAvatar>
            <Avatar alt="" src={image_url ?? initialThumbnail} />
          </ListItemAvatar>
          <ListItemText
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
                  {processDate(created_at)} に作成
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
