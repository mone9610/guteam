/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { VFC, useState, useEffect, useContext } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useAuth0 } from '@auth0/auth0-react';
import ReactS3Client from 'react-aws-s3-typescript';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTitle } from 'common/features/pageTitleSlice';

import { User } from 'common/CustomTypes';
import Spinner from 'presentational/molecules/Spinner';
import CustomizedSnackbars from 'presentational/molecules/CustomizedSnackbars';
import { absSubFromUserID, getUser } from 'common/customFunctions';
import { useToken } from 'common/CustomHooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      overflow: 'hidden',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing(4),
    },
    imgCircleEditable: {
      borderRadius: '50%',
      width: '100px',
      height: '100px',
    },
    textField: {
      width: '30ch',
    },
    alert: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const basePath = process.env.REACT_APP_REST_URL;
const pathParam = '/users/';
const initialAvatar = process.env.REACT_APP_INITIAL_AVATAR;

// ToDo:AWS接続用の関数は、custom functionsとして共通化する
const config = {
  // bucketName: process.env.S3_BUCKET!,
  bucketName: process.env.REACT_APP_S3_BUCKET!,
  dirName: 'profile/test',
  region: process.env.REACT_APP_REGION!,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY!,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!,
};

// eslint-disable-next-line consistent-return
const uploadFile = async (file: any) => {
  /* Import s3 config object and call the constrcutor */
  const ts = Date.parse(new Date().toISOString());
  const s3 = new ReactS3Client(config);
  const filename = `${ts}`; /* Optional */
  try {
    const res = await s3.uploadFile(file, filename);
    return res.location;
  } catch (exception) {
    console.log(exception);
  }
};

const Profile: VFC = () => {
  const classes = useStyles();
  const { user, getAccessTokenSilently, isLoading } = useAuth0();
  const [userData, setUserData] = useState<User>();
  // const [userType, setUserType] = useState<User>();
  const [inputName, setInputName] = useState(userData?.name);
  const [inputIntroduction, setInputIntroduction] = useState(
    userData?.introduction
  );
  const [pictureUrl, setPictureUrl] = useState(userData?.picture_url);
  const userSub: any = user?.sub;
  const userID: string = absSubFromUserID(userSub);
  const token = useToken();
  const [progress, setProgress] = useState(true);
  const [isResistered, setIsResistered] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    type: 'success',
    message: '成功しました。',
  });

  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const url = basePath + pathParam + userID;

  // ToDo:dispatchとtitleの更新を共通化できないか検討
  const pageTitle = 'プロフィール';
  const dispatch = useDispatch();
  const updateTitle = () => {
    dispatch(setTitle(pageTitle));
  };
  void updateTitle();

  async function processImage(event: any) {
    const sizeLimit = 1024 * 1024 * 1;
    const imageFile = event.target.files[0];
    if (event.target.files[0].size > sizeLimit) {
      setStatus({
        open: true,
        type: 'error',
        message: 'ファイルサイズは1MB以下にしてください',
      });
    } else {
      const loc = await uploadFile(imageFile);
      setPictureUrl(loc);
    }
  }

  // ToDo:CustomHookとして共通化する
  useEffect(() => {
    setProgress(true);
    const header = `Bearer ${token}`;

    // HACK:トークン取得後に更新されるフラグをもとに、getリクエストを制御している
    if (token)
      // ToDo:getUser関数として、共通化する
      void axios
        .get<User>(url, {
          headers: {
            Authorization: header,
          },
          timeout: 10000,
        })
        .then((res) => {
          setUserData(res.data);
          setProgress(false);
          setIsResistered(true);
        })
        .catch((err) => {
          console.log('err:', err);
          setStatus({
            open: true,
            type: 'error',
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            message: `予期せぬエラーが発生しました。(コード：${err.response.status})`,
          });
        });

    //  Todo: ユーザーが登録されていなかった場合の初回登録用関数。postUser関数として共通化する。
    // if (!isResistered)
    //   void axios
    //     .post<User>(
    //       url2,
    //       {
    //         name: null,
    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //         sub: absSubFromUserID(userSub),
    //         introduction: null,
    //         picture_url: initialAvatar,
    //       },
    //       {
    //         headers: {
    //           Authorization: header,
    //           ContentType: 'application/json; charset=utf-8',
    //         },

    //         timeout: 10000,
    //       }
    //     )
    //     .then((res) => {
    //       setProgress(false);
    //       setIsResistered(true);
    //     })
    //     .catch((err) => {
    //       console.log('err:', err);
    //       // <Alert className={classes.alert} severity="error">
    //       //   エラーが発生しました。しばらく待ってから再度試してください。
    //       // </Alert>;
    //       // alert('エラーが発生しました。しばらく待ってから再度試してください。');
    //     });
  }, [getAccessTokenSilently, isResistered, token, url, userSub]);

  function putUser() {
    const header = `Bearer ${token}`;
    void axios
      .put<User>(
        url,
        {
          name: inputName,
          introduction: inputIntroduction,
          picture_url: pictureUrl,
        },
        {
          headers: {
            Authorization: header,
            // Authorization: 'hogehoge',
          },
          timeout: 10000,
        }
      )
      .then((res) => {
        console.log(res.status);
        setStatus({
          open: true,
          type: 'success',
          message: 'プロフィールの更新に成功しました。',
        });
      })
      .catch((err) => {
        console.log('err:', err);
        setStatus({
          open: true,
          type: 'error',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          message: `プロフィールの更新に失敗しました。(コード：${err.response.status})`,
        });
      });
  }

  const handleClose = (event: unknown, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setStatus({ ...status, open: false });
  };

  return (
    <div>
      {progress ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <main className={classes.content}>
            <CustomizedSnackbars
              open={status.open}
              handleClose={handleClose}
              type={status.type}
              message={status.message}
            />
            <br />
            {/* <form autoComplete="off" onSubmit={() => handleSubmit()}> */}
            <img
              // type="image"
              // src={userData?.picture_url ?? initialAvatar}
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
              justify="center"
              justifyContent="center"
              alignContent="center"
              // direction="row-reverse"
              spacing={2}
            >
              <Grid item xs={12} justifyContent="center">
                <Button
                  onClick={() => putUser()}
                  variant="contained"
                  size="large"
                  color="primary"
                  // type="submit"
                >
                  変更を保存
                </Button>
              </Grid>
            </Grid>
            {/* </form> */}
          </main>
        </>
      )}
    </div>
  );
};

export default Profile;
