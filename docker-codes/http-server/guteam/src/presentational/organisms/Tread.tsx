import { VFC } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      flexGrow: 1,
      overflow: 'auto',
      'text-align': 'left',
    },
    thread: {
      border: '1px ',
      width: '75vw',
      // marginLeft: 'theme.spacing(6)',
    },
    inline: {
      display: 'inline',
    },
    list: {
      width: '75vw',
    },
    accordion: {
      'background-color': '#fafafa',
    },
  })
);

const Thread: VFC = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.thread}>
        <h1>今日の勤務時間</h1>
        <h5>2021/08/20 12:21に作成</h5>
        <List className={classes.list}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="U H" />
                </ListItemAvatar>
                <ListItemText
                  primary="馬山働次郎"
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        今日は12時間働いた。とても疲れた。
                      </Typography>
                      <br />
                      {' 2021/08/19 23:12に投稿'}
                    </>
                  }
                />
              </ListItem>
            </AccordionSummary>
            <Divider variant="fullWidth" component="li" />
            <AccordionDetails>
              <List className={classes.list}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="I J" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="犬谷従太郎"
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          今日は上司に3回回ってワンといえと言われました。
                        </Typography>
                        <br />
                        {' 2021/08/19 21:12に投稿'}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="U H" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="馬山働次郎"
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          今日は12時間働いた。とても疲れた。
                        </Typography>
                        <br />
                        {' 2021/08/19 23:12に投稿'}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="I J" />
                  </ListItemAvatar>
                  <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="このスレッドに返信"
                    helperText="140字以内で入力してください。"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </ListItem>
              </List>
              <Divider variant="fullWidth" component="li" />
            </AccordionDetails>
          </Accordion>
        </List>
      </div>
    </div>
  );
};

export default Thread;
