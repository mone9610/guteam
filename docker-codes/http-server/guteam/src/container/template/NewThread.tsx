/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useAuth0 } from '@auth0/auth0-react';

import { setSnackbarState } from 'common/features/snackbarSlice';

import {
  absSubFromUserID,
  postCommunityThread,
  uploadFile,
} from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      overflow: 'hidden',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      margin: theme.spacing(1, 0, 3),
    },
    imgCircleEditable: {
      borderRadius: '50%',
      width: '100px',
      height: '100px',
    },
    textField: {
      width: '40ch',
    },
    txt: {
      margin: theme.spacing(2),
    },
  })
);

const initialThumbnail = process.env.REACT_APP_INITIAL_THUMBNAIL;

const NewThread: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { communityid } = useParams<{ communityid: string }>();

  //   認証・subの取得周りを制御
  const token = useToken();
  const { user } = useAuth0();
  const rawSub = user?.sub as string;
  const sub: string = absSubFromUserID(rawSub);

  //   ビューと入力フォームの状態管理
  const [inputTitle, setInputTitle] = useState<string>();
  const [inputDescription, setInputDescription] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();

  //   画像のアップロード制御
  const processImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const sizeLimit = 1024 * 1024 * 1;
    const imageFile = event.target.files[0];
    if (event.target.files[0].size > sizeLimit) {
      dispatch(
        setSnackbarState({
          open: true,
          type: 'error',
          message: 'ファイルサイズは1MB以下にしてください',
        })
      );
    } else {
      const loc = await uploadFile(imageFile, sub, 'thumbnail');
      if (loc === undefined) {
        dispatch(
          setSnackbarState({
            open: true,
            type: 'error',
            message:
              'アップロードに失敗しました。しばらく時間をおいて再試行してください。',
          })
        );
      } else {
        setImageUrl(loc);
      }
    }
  };

  const updateProfile = () => {
    const data = {
      title: inputTitle as string,
      description: inputDescription as string,
      image_url: imageUrl as string,
      community_id: Number(communityid),
    };
    if (token)
      void postCommunityThread(token, data)
        .then(() => {
          dispatch(
            setSnackbarState({
              open: true,
              type: 'success',
              message: 'スレッドの作成に成功しました。',
            })
          );
          history.push(`/client/community/${communityid}`);
        })
        .catch(() => {
          dispatch(
            setSnackbarState({
              open: true,
              type: 'error',
              message: `スレッドの作成に失敗しました。`,
            })
          );
        });
  };

  return (
    <div>
      <>
        <div className={classes.txt}>
          <Typography variant="h6">新規スレッドを作成します。</Typography>
          <Typography variant="subtitle1">
            ※利用規約をご確認のうえ、作成してください。
          </Typography>
        </div>
        <main className={classes.content}>
          <br />
          <img
            src={imageUrl ?? initialThumbnail}
            alt="未設定"
            className={classes.imgCircleEditable}
          />
          <p />
          <Button variant="contained" color="secondary" component="label">
            サムネイルをアップロード
            <input
              type="file"
              id="customFile"
              accept="image/*"
              onChange={processImage}
              hidden
            />
          </Button>
          <p />
          <TextField
            required
            id="standard-required"
            name="title"
            label="スレッド名"
            defaultValue=""
            className={classes.textField}
            helperText="全角16字以内で入力"
            inputProps={{ maxLength: 16 }}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <p />
          <TextField
            required
            id="outlined-helperText"
            name="description"
            label="スレッド説明"
            defaultValue=""
            helperText="全角64字以内で入力"
            inputProps={{ maxLength: 64 }}
            variant="outlined"
            multiline
            rows={4}
            className={classes.textField}
            onChange={(e) => setInputDescription(e.target.value)}
          />
          <p />
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item xs={12}>
              {inputTitle && inputDescription ? (
                <Button
                  onClick={updateProfile}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  スレッドを作成
                </Button>
              ) : (
                <Button
                  disabled
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  スレッドを作成
                </Button>
              )}
            </Grid>
          </Grid>
        </main>
      </>
    </div>
  );
};

export default NewThread;
