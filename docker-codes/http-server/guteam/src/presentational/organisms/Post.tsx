// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
// railsから取得するオブジェクトのプロパティはキャメルケースのため、無効化
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

type Props = {
  key: number;
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
    picture_url,
    name,
    message,
    created_at,
    // updated_at,
    is_deleted,
  } = props;

  // HACK:jsonは文字列として日付を受け取るため、一度Date型に変換して、フォーマットした上で代入している
  // eslint-disable-next-line react/destructuring-assignment
  const DateObject = new Date(created_at);
  const YYYY = DateObject.getFullYear();
  const MM = 1 + DateObject.getMonth();
  const DD = DateObject.getDate();
  const hh = DateObject.getHours();
  const mm = DateObject.getMinutes();

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
                  {YYYY}/{MM}/{DD} {hh}:{mm}に投稿
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
                  {YYYY}/{MM}/{DD} {hh}:{mm}に投稿
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
