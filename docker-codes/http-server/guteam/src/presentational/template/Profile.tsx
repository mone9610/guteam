/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { VFC, useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Formik, Form, Field } from 'formik';

import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';
import Spinner from '../molecules/Spinner';

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

// ToDo:typeは別ファイルで管理する予定
type UserType = {
  id: string;
  name: string;
  sub: string;
  introduction: string;
  // eslint-disable-next-line camelcase
  picture_url: string;
};
export type { UserType };

// ToDo:共通化する
const getUserID = (sub: string): string => {
  const userID = sub.replace(/auth0\|/g, '');
  return userID;
};

const basePath = process.env.REACT_APP_REST_URL;
const pathParam = '/users/';
const initialAvatar =
  'https://user-images.githubusercontent.com/64692797/131617276-b5222ddb-25ac-4877-93d6-7e5432229512.jpg';

const Profile: VFC = () => {
  const classes = useStyles();
  const { user, getAccessTokenSilently } = useAuth0();
  const [userType, setUserType] = useState<UserType>();
  const [progress, setProgress] = useState(false);
  const [inputName, setInputName] = useState(userType?.name);
  const [inputIntroduction, setInputIntroduction] = useState(
    userType?.introduction
  );
  const [pictureUrl, setPictureUrl] = useState(userType?.picture_url);
  const [token, setToken] = useState('');

  // HACK：userSubを宣言しないとgetUserIDが実行できないため、定数を2回宣言している
  const userSub: any = user?.sub;
  const userID: string = getUserID(userSub);
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const url = basePath + pathParam + userID;

  // ToDo:getUser関数として、共通化する
  useEffect(() => {
    setProgress(true);
    const header = `Bearer ${token}`;

    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(e.message);
      }
    };
    void getToken();

    // HACK:トークン取得後に更新されるフラグをもとに、getリクエストを制御している
    if (token)
      void axios
        .get<UserType>(url, {
          headers: {
            Authorization: header,
          },
          timeout: 10000,
        })
        .then((res) => {
          setUserType(res.data);
          setProgress(false);
        })
        .catch((err) => {
          console.log('err:', err);
          // <Alert className={classes.alert} severity="error">
          //   エラーが発生しました。しばらく待ってから再度試してください。
          // </Alert>;
          alert('エラーが発生しました。しばらく待ってから再度試してください。');
        });
  }, [classes.alert, getAccessTokenSilently, token, url]);

  // ToDo:putUser関数として、共通化する
  const handleSubmit = () => {
    const header = `Bearer ${token}`;
    const data = {
      name: inputName,
      introduction: inputIntroduction,
      picture_url: pictureUrl,
    };
    axios
      .put(url, data, {
        headers: {
          Authorization: header,
        },
      })
      .then((res) => {
        alert(' プロフィールを更新しました。');
      })
      .catch((error) => {
        alert('エラーが発生しました。しばらく待ってから再度試してください。');
      });
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
            <br />
            {/* <form autoComplete="off" onSubmit={() => handleSubmit()}> */}
            <img
              // type="image"
              src={userType?.picture_url ?? initialAvatar}
              alt={userType?.picture_url ?? '未設定'}
              className={classes.imgCircleEditable}
            />
            <p />
            <TextField
              id="standard-required"
              name="name"
              label="ユーザー名"
              defaultValue={userType?.name ?? '未設定'}
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
              defaultValue={userType?.introduction ?? ''}
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
              defaultValue={userType?.sub ?? '未取得'}
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
                  onClick={() => handleSubmit()}
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
