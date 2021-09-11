/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { PostData, User } from 'common/CustomTypes';
import Skeleton from '@material-ui/lab/Skeleton';
import Spinner from 'presentational/molecules/Spinner';
import Post from 'presentational/organisms/Post';

import { userInfo } from 'os';

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

// function sampleDate(date: , format: string) {
//   format = format.replace(/YYYY/, date.getFullYear());
//   format = format.replace(/MM/, date.getMonth() + 1);
//   format = format.replace(/DD/, date.getDate());

//   return format;
// }

type Props = {
  posts: PostData[];
  users: User[];
  isLoading: boolean;
};

const PostList: VFC<Props> = (props) => {
  const classes = useStyles();
  //   const { isLoading } = isLoading;

  return (
    <div>
      {props.isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <List className={classes.root}>
            {props.posts.map((post) => (
              <Post
                key={post.id}
                picture_url="hogehoge"
                name="hogehoge"
                message={post.message}
                is_deleted={post.is_deleted}
                created_at={post.created_at}
                updated_at={post.updated_at}
              />
              // <ListItem alignItems="flex-start" key={post.id}>
              //   <ListItemAvatar>
              //     <Avatar alt="犬" src="/static/images/avatar/1.jpg" />
              //   </ListItemAvatar>
              //   <ListItemText
              //     // primary={users.find((name) => post.user_id === user.id)}
              //     secondary={
              //       <>
              //         <Typography
              //           component="span"
              //           variant="body2"
              //           className={classes.inline}
              //           color="textPrimary"
              //         >
              //           {post.message}
              //         </Typography>
              //         <br />
              //         {post.created_at}
              //         {/* {() => sampleDate(post.created_at, 'YYYY年MM月DD日')} */}
              //         に投稿
              //       </>
              //     }
              //   />
              // </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default PostList;
