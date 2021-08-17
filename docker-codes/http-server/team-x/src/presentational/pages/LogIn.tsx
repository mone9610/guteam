import { VFC } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import LogoMedium from '../../assets/img/logo_medium.jpg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        愚痴〜ム
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn: VFC = () => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className="paper">
      <img src={LogoMedium} alt="Logo" className="-align-center" />
      <Typography component="h1" variant="h5">
        サインイン
      </Typography>
      <form className="form" noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="メールアドレス"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="パスワード"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="ログイン情報を記憶する"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit"
        >
          ログイン
        </Button>
        <Grid container>
          <Grid item xs>
            パスワードをお忘れの方
          </Grid>
          <Grid item>新しくサインアップする</Grid>
        </Grid>
      </form>
    </div>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>
);

export default LogIn;
