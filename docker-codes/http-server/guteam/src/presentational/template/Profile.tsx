/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { VFC, useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
  })
);

type User2 = {
  id: string;
  name: string;
  sub: string;
  introduction: string;
  // eslint-disable-next-line camelcase
  picture_url: string;
};
export type { User2 };

const basePath = 'http://localhost:3000/api/v1/users/';
const pathParam = '6129adf2f2e16000706316e9';
const url = basePath + pathParam;

const Profile: VFC = () => {
  const classes = useStyles();
  const { user, getAccessTokenSilently } = useAuth0();
  const [user2, setUser2] = useState<User2>();
  const [progress, setProgress] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputIntroduction, setInputIntroduction] = useState('');
  const [pictureUrl, setPictureUrl] = useState<string>('');

  useEffect(() => {
    setProgress(true);
    void axios
      .get<User2>(url, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRuZWJLcmtuSm9xOTJOZGRHYmc2ViJ9.eyJpc3MiOiJodHRwczovL2d1dGVhbS5qcC5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjEyOWFkZjJmMmUxNjAwMDcwNjMxNmU5IiwiYXVkIjpbImh0dHBzOi8vZ3V0ZWFtX2FwaSIsImh0dHBzOi8vZ3V0ZWFtLmpwLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MzAzNzcwMDMsImV4cCI6MTYzMDQ2MzQwMywiYXpwIjoiYjdIUDBFOExCMzdVVWQ1UE1CRGg5UUxCanJMWXpBUEYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOltdfQ.DmPIYDpaJkpJEOcTbVPMMEMYuLPjMySdbZax97DuWCJpC0CJLV4xyuNog_a-rHiKPiSDRu_lTu0IgWy9ygoIZupzccZuNjLSsfVBOYeCDrIxE17lrMUnU8KFSS9IP-U9xwUKRPPNB_NaE1ZIhYrSd7vhdJc1UZLrlI3KksqVEJjE27ZBdXBYnKcGrDa-lB7pgj6ROQxfcTkxgGmxVk_R37-pzkyj2cQsz6IiGmrjnzx9neBcgH2EANqqf0n2_v_49sE_1mPaLYGiRErnUlMh8mD824DxqhYRxYn9rtK1hckedh4atTR8zHjReHU8mGqc5w-rNMU0wdMgKxX0H0dusw',
        },
        timeout: 10000,
      })
      .then((res) => {
        setUser2(res.data);
        setProgress(false);
      })
      .catch((err) => {
        console.log('err:', err);
        alert(
          'エラーが発生しました。しばらくしてからもう一度試してみてください。'
        );
      });
  }, []);

  const handleSubmit = () => {
    const data = {
      name: inputName,
      introduction: inputIntroduction,
      picture_url: pictureUrl,
    };
    axios
      .put(url, data, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRuZWJLcmtuSm9xOTJOZGRHYmc2ViJ9.eyJpc3MiOiJodHRwczovL2d1dGVhbS5qcC5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjEyOWFkZjJmMmUxNjAwMDcwNjMxNmU5IiwiYXVkIjpbImh0dHBzOi8vZ3V0ZWFtX2FwaSIsImh0dHBzOi8vZ3V0ZWFtLmpwLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MzAzNzcwMDMsImV4cCI6MTYzMDQ2MzQwMywiYXpwIjoiYjdIUDBFOExCMzdVVWQ1UE1CRGg5UUxCanJMWXpBUEYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOltdfQ.DmPIYDpaJkpJEOcTbVPMMEMYuLPjMySdbZax97DuWCJpC0CJLV4xyuNog_a-rHiKPiSDRu_lTu0IgWy9ygoIZupzccZuNjLSsfVBOYeCDrIxE17lrMUnU8KFSS9IP-U9xwUKRPPNB_NaE1ZIhYrSd7vhdJc1UZLrlI3KksqVEJjE27ZBdXBYnKcGrDa-lB7pgj6ROQxfcTkxgGmxVk_R37-pzkyj2cQsz6IiGmrjnzx9neBcgH2EANqqf0n2_v_49sE_1mPaLYGiRErnUlMh8mD824DxqhYRxYn9rtK1hckedh4atTR8zHjReHU8mGqc5w-rNMU0wdMgKxX0H0dusw',
        },
      })
      .then((res) => {
        alert('プロフィールを更新しました。');
      })
      .catch((error) => {
        alert('エラーが発生しました。');
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
            <form autoComplete="off" onSubmit={() => handleSubmit()}>
              {/* ToDo:画像についてはURLがなければ初期イメージを設定する */}
              <input
                type="image"
                src={user2?.picture_url}
                alt={user2?.picture_url}
                className={classes.imgCircleEditable}
                onClick={() =>
                  setPictureUrl(
                    'https://s.gravatar.com/avatar/680e0e78ed099c9ec31c82c0c949169c?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgu.png'
                  )
                }
              />
              <p />
              <TextField
                id="standard-required"
                name="name"
                label="ユーザー名"
                defaultValue={user2?.name}
                className={classes.textField}
                helperText="全角8字以内で入力"
                inputProps={{ maxLength: 8 }}
                onChange={(e) => setInputName(e.target.value)}
              />
              <p />
              <TextField
                id="outlined-helperText"
                name="introduction"
                label="自己紹介"
                defaultValue={user2?.introduction}
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
                defaultValue={user2?.sub}
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
              />
              <p />
              {/* ToDo:emailのからむを作成する */}
              <TextField
                disabled
                id="standard-read-only-input"
                label="メールアドレス"
                helperText="公開されません"
                defaultValue={user?.email}
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
              />
              <p />
              <TextField
                disabled
                id="standard-read-only-input"
                label="役割"
                defaultValue="管理者"
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
                    // onClick={() => handleSubmit()}
                    variant="contained"
                    size="large"
                    color="primary"
                    type="submit"
                  >
                    変更を保存
                  </Button>
                </Grid>
              </Grid>
            </form>
          </main>
        </>
      )}
    </div>
  );
};

export default Profile;
