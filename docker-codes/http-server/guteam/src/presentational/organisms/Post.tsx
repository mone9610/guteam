/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

const initialAvatar = process.env.REACT_APP_INITIAL_AVATAR;

type Props = {
  key: number;
  picture_url?: string;
  name?: string;
  // name: string;
  message: string;
  created_at: string;
  updated_at?: string;
  is_deleted: boolean;
};

const Post: VFC<Props> = (props) => {
  const classes = useStyles();
  const {
    key,
    picture_url,
    name,
    message,
    created_at,
    updated_at,
    is_deleted,
  } = props;

  return (
    <div>
      {is_deleted ? (
        <>
          <ListItem alignItems="flex-start" key={key}>
            <ListItemAvatar>
              <Avatar alt="×" src={picture_url} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    この投稿は削除されました。
                  </Typography>
                  <br />
                  {updated_at}に削除
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ) : (
        <>
          <ListItem alignItems="flex-start" key={key}>
            <ListItemAvatar>
              <Avatar alt="" src={picture_url} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {message}
                  </Typography>
                  <br />
                  {created_at}に投稿
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      )}
    </div>
  );
};

export default Post;
