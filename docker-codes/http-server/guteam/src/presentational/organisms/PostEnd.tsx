import { VFC } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80vw',
      marginBottom: '10vh',
    },
    inline: {
      display: 'inline',
    },
  })
);

const PostEnd: VFC = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="これ以上の投稿はありません"
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                新しく愚痴を投稿してみましょう！
              </Typography>
              <br />
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default PostEnd;
