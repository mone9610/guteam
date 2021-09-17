import { VFC, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { postPost } from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';
import { setReload } from 'common/features/reloadSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';

const MessageForm: VFC = () => {
  const token = useToken();
  const [message, setMessage] = useState<string>();

  const dispatch = useDispatch();

  const send = useCallback(() => {
    void postPost(token, message!).then((res) => {
      if (res === 200) {
        setMessage('');
        dispatch(setReload(true));
        dispatch(
          setSnackbarState({
            open: true,
            type: 'success',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            message: '送信に成功しました。',
          })
        );
      } else {
        dispatch(
          setSnackbarState({
            open: true,
            type: 'error',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            message: `予期せぬエラーが発生しました。(コード：${res})`,
          })
        );
      }
    });
  }, [dispatch, message, token]);

  //   Ctrl + Enterでイベントを実行するための関数
  const handleKeyDown = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.keyCode === 13 && event.ctrlKey) {
      // HACK:バリデーション機能の仮置き
      if (message?.length === 0) {
        return;
      }
      send();
    }
  };

  // 入力フォームの変更を検知するための関数
  const handleChange = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    setMessage(event.target.value);
  };

  return (
    <>
      <TextField
        autoComplete="off"
        id="standard-full-width"
        style={{ margin: 8 }}
        placeholder="160字以内でメッセージを入力"
        helperText={
          message?.length === 0
            ? '文字を入力してください'
            : 'Ctrl + Enterで送信可能'
        }
        fullWidth
        autoFocus
        margin="normal"
        value={message}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {message ? (
                <IconButton onClick={() => send()}>
                  <SendIcon />
                </IconButton>
              ) : (
                <IconButton disabled>
                  <SendIcon />
                </IconButton>
              )}
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
