/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useAuth0 } from '@auth0/auth0-react';

import { setTitle } from 'common/features/pageTitleSlice';
import { ProgressState, setProgress } from 'common/features/progressSlice';
import { setSnackbarState } from 'common/features/snackbarSlice';

import { User } from 'common/CustomTypes';
import {
  absSubFromUserID,
  getUser,
  putUser,
  uploadFile,
} from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';

import Spinner from 'presentational/molecules/Spinner';

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
      width: '30ch',
    },
  })
);

const initialAvatar = process.env.REACT_APP_INITIAL_AVATAR;

const Profile: VFC = () => {
  const classes = useStyles();

  //   認証・subの取得周りを制御
  const token = useToken();
  const { user } = useAuth0();
  const rawSub = user?.sub as string;
  const sub: string = absSubFromUserID(rawSub);

  //   ビューと入力フォームの状態管理
  const [userData, setUserData] = useState<User>();
  const [inputName, setInputName] = useState(userData?.name);
  const [inputIntroduction, setInputIntroduction] = useState(
    userData?.introduction
  );
  const [pictureUrl, setPictureUrl] = useState(userData?.picture_url);

  //   ページタイトルのアップデート
  const pageTitle = 'プロフィール';
  const dispatch = useDispatch();
  const updateTitle = () => {
    dispatch(setTitle(pageTitle));
  };
  void updateTitle();

  //   ローディング機構
  const progressJson = useSelector((state: ProgressState) => state.progress);
  const updateProgress = (state: boolean) => {
    dispatch(setProgress(state));
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isLoading = Object.values(progressJson)[0];

  const load = useCallback(() => {
    if (token) {
      void getUser(token, sub)
        .then((u) => {
          setUserData(u);
        })
        .then(() => {
          updateProgress(false);
        });
    }
  }, [sub, token]);

  //   画像のアップロード制御
  const processImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const sizeLimit = 1024 * 1024 * 1;
    const imageFile = event.target.files[0];
    if (event.target.files[0].size > sizeLimit) {
      setSnackbarState({
        open: true,
        type: 'error',
        message: 'ファイルサイズは1MB以下にしてください',
      });
    } else {
      const loc = await uploadFile(imageFile, sub);
      if (loc === undefined) {
        setSnackbarState({
          open: true,
          type: 'error',
          message: 'アップロードに失敗しました。',
        });
      } else {
        setPictureUrl(loc);
      }
    }
  };

  const updateProfile = () => {
    const data = {
      name: inputName,
      introduction: inputIntroduction,
      picture_url: pictureUrl,
    };
    if (token)
      void putUser(token, sub, data).then((res) => {
        if (res === 200) {
          dispatch(
            setSnackbarState({
              open: true,
              type: 'success',
              message: 'プロフィールの更新に成功しました。',
            })
          );
        } else {
          dispatch(
            setSnackbarState({
              open: true,
              type: 'error',
              message: `予期せぬエラーが発生しました。(コード：${res})`,
            })
          );
        }
      });
  };

  useEffect(() => {
    updateProgress(true);
    void load();
  }, [token]);

  return (
    <div>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <main className={classes.content}>
            <br />
            <img
              src={pictureUrl ?? userData?.picture_url ?? initialAvatar}
              alt={userData?.picture_url ?? '未設定'}
              className={classes.imgCircleEditable}
            />
            <p />
            <Button variant="contained" color="secondary" component="label">
              画像をアップロード
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
              id="standard-required"
              name="name"
              label="ユーザー名"
              defaultValue={userData?.name ?? '未設定'}
              className={classes.textField}
              helperText="全角16字以内で入力"
              inputProps={{ maxLength: 16 }}
              onChange={(e) => setInputName(e.target.value)}
            />
            <p />
            <TextField
              id="outlined-helperText"
              name="introduction"
              label="自己紹介"
              defaultValue={
                userData?.introduction ?? '自己紹介を書いてみよう！'
              }
              helperText="全角120字以内で入力"
              inputProps={{ maxLength: 120 }}
              variant="outlined"
              multiline
              rows={10}
              className={classes.textField}
              onChange={(e) => setInputIntroduction(e.target.value)}
            />
            <p />
            <TextField
              disabled
              id="standard-read-only-input"
              label="ユーザーID"
              defaultValue={userData?.sub ?? '未取得'}
              InputProps={{
                readOnly: true,
              }}
              className={classes.textField}
            />
            <p />
            <Grid
              container
              justifyContent="center"
              alignContent="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Button
                  onClick={updateProfile}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  変更を保存
                </Button>
              </Grid>
            </Grid>
          </main>
        </>
      )}
    </div>
  );
};

export default Profile;
