import { VFC, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { postPost } from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';
import { setProgress } from 'common/features/progressSlice';
import { setReload } from 'common/features/reloadSlice';

const MessageForm: VFC = () => {
  const token = useToken();
  const [message, setMessage] = useState<string>();

  const dispatch = useDispatch();

  const send = useCallback(() => {
    dispatch(setProgress(true));
    void postPost(token, message!).then((res) => {
      if (res === 200) {
        setMessage('');
        dispatch(setReload(true));
      } else {
        dispatch(setReload(true));
        console.log('error');
      }
    });
  }, [dispatch, message, token]);

  return (
    <>
      <TextField
        autoComplete="off"
        id="standard-full-width"
        style={{ margin: 8 }}
        placeholder="ここにメッセージを入力"
        helperText="160字以内で入力してください。"
        fullWidth
        autoFocus
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => send()}
                // onClick={() => postPostData(token)}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        // 大文字と小文字のプロパティが存在する模様
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          maxLength: 160,
        }}
      />
    </>
  );
};

export default MessageForm;
