import { VFC } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import LargeSignUpButton from '../molecules/LargeSignUpButton';
import LargeLoginButton from '../molecules/LargeLoginButton';
import EasyLoginButton from '../molecules/EasyLoginButton';
import Home1 from '../../assets/img/home1.jpg';
import Timeline from '../../assets/img/timeline.svg';
import Community from '../../assets/img/community.svg';
import Team from '../../assets/img/team.svg';
import Direct from '../../assets/img/direct.svg';

const useStyles = makeStyles({
  txt: {
    display: 'inline-block',
    'text-align': 'left',
    margin: '30px 20px 30px 20px',
  },
  display1: {
    display: 'inline-block',
    'text-align': 'left',
    margin: '200px 20px 200px 20px',
  },
  display2: {
    display: 'inline-block',
    'text-align': 'center',
    margin: '200px 20px 200px 20px',
  },
  resizeimage: {
    margin: '30px 0px 30px 0px',
    width: '90%',
    'max-width': '90%',
    height: 'auto',
  },
});

const Rows: VFC = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        <Grid container alignItems="center">
          <Grid item md={6} justifyContent="center">
            <p className={classes.txt}>
              <Typography variant="h3">愚痴〜ム</Typography>
              <Typography variant="h4">「愚痴」でつながる新感覚SNS</Typography>
              <p>
                <LargeSignUpButton />
              </p>
              <p>
                <LargeLoginButton />
              </p>
              <p>
                <EasyLoginButton />
              </p>
            </p>
          </Grid>
          <Grid item md={6} alignItems="center">
            <img
              className={classes.resizeimage}
              src={Home1}
              alt="愚痴を言い合っている画像"
            />
          </Grid>
        </Grid>
        <Grid item md={12} justifyContent="center">
          <p className={classes.display1}>
            <Typography variant="h3">ストレス社会で戦う人たちへ。</Typography>
            <Typography variant="h4">
              学校、職場、家庭、etc・・・
              <br />
              言いたいことを誰にも言えず、溜め込んでいませんか？
              <br />
              愚痴〜ムでは、日頃の悩みを呟いたり、似たような仲間同士でつながったり、
              <br />
              ふだんは話せないようなことを言い合える仲間たちを見つけることができます。
              <br />
              登録は無料です。いますぐはじめましょう。
            </Typography>
          </p>
        </Grid>
        <Grid container alignItems="center">
          <Grid item md={6} justifyContent="center">
            <p className={classes.txt}>
              <Typography variant="h3">タイムライン機能</Typography>
              <Typography variant="h4">
                リアルタイムで愚痴を
                <br />
                吐き出しましょう。
              </Typography>
            </p>
          </Grid>
          <Grid item md={6} alignItems="center">
            <img
              className={classes.resizeimage}
              src={Timeline}
              alt="タイムライン"
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid container alignItems="center">
            <Grid item md={6} justifyContent="center">
              <p className={classes.txt}>
                <Typography variant="h3">コミュニティ機能</Typography>
                <Typography variant="h4">
                  同じ愚痴を抱える人と
                  <br />
                  交流しましょう。
                </Typography>
              </p>
            </Grid>
            <Grid item md={6} alignItems="center">
              <img
                className={classes.resizeimage}
                src={Community}
                alt="コミュニティ"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid container alignItems="center">
            <Grid item md={6} justifyContent="center">
              <p className={classes.txt}>
                <Typography variant="h3">チーム機能</Typography>
                <Typography variant="h4">
                  気の合う仲間達と
                  <br />
                  愚痴を吐き出しあいましょう。
                </Typography>
              </p>
            </Grid>
            <Grid item md={6} alignItems="center">
              <img className={classes.resizeimage} src={Team} alt="チーム" />
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid container alignItems="center">
            <Grid item md={6} justifyContent="center">
              <p className={classes.txt}>
                <Typography variant="h3">ダイレクト機能</Typography>
                <Typography variant="h4">
                  信頼できる人と
                  <br />
                  愚痴を話し合いましょう。
                </Typography>
              </p>
            </Grid>
            <Grid item md={6} alignItems="center">
              <img
                className={classes.resizeimage}
                src={Direct}
                alt="ダイレクト"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} justifyContent="center">
          <p className={classes.display2}>
            <Typography variant="h3">
              いますぐ愚痴〜ムを始めましょう。
            </Typography>
            <br />
            <Typography variant="h4">登録は簡単です。</Typography>
            <br />
            <p>
              <LargeSignUpButton />
            </p>
            <p>
              <LargeLoginButton />
            </p>
            <p>
              <EasyLoginButton />
            </p>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};
export default Rows;
