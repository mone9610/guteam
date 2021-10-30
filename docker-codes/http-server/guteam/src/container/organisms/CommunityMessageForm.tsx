import { VFC, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { postThreadPost } from 'common/customFunctions';
import { useToken, useSize } from 'common/CustomHooks';
import { setReload } from 'common/features/reloadSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';

const CommunityMessageForm: VFC = () => {
  const token = useToken();
  const [m, setM] = useState<string>();
  const { threadid } = useParams<{ threadid: string }>();

  const dispatch = useDispatch();

  const isMobileSize = useSize();

  const send = useCallback(() => {
    const body = {
      message: m as string,
      community_thread_id: Number(threadid),
    };
    void postThreadPost(token, body)
      .then(() => {
        setM('');
        dispatch(setReload(true));
        dispatch(
          setSnackbarState({
            open: true,
            type: 'success',
            message: '送信に成功しました。',
          })
        );
      })
      .catch(() => {
        dispatch(
          setSnackbarState({
            open: true,
            type: 'error',
            message: '予期せぬエラーが発生しました。',
          })
        );
      });
  }, [dispatch, m, threadid, token]);

  //   Ctrl + Enterでイベントを実行するための関数
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      // HACK:バリデーション機能の仮置き
      if (m?.length === 0 || m === undefined) {
        return;
      }
      send();
    }
  };

  // 入力フォームの変更を検知するための関数
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setM(event.target.value);
  };

  return (
    <>
      <TextField
        autoComplete="off"
        id="standard-full-width"
        style={{ margin: 8 }}
        placeholder="160字以内でメッセージを入力"
        helperText={
          // モバイルサイズかどうかを判定し、helpertextを切り替える
          // eslint-disable-next-line no-nested-ternary
          m?.length === 0
            ? '文字を入力してください'
            : isMobileSize
            ? 'ボタンをタップして送信'
            : 'Ctrl + Enterで送信可能'
        }
        fullWidth
        autoFocus={!isMobileSize}
        margin="normal"
        value={m}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {m ? (
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

export default CommunityMessageForm;
