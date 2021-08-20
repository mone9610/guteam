import { VFC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      position: 'fixed',
      bottom: 0,
      width: '80vw',
      'background-color': '#fafafa',
      margin: theme.spacing(1),
    },
  })
);

const ClientFooter: VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <TextField
        id="standard-full-width"
        style={{ margin: 8 }}
        placeholder="ここにメッセージを入力"
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
    </div>
  );
};

export default ClientFooter;
