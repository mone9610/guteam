import React, { VFC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

// import Uma from '../../assets/img/uma.jpg';

// function getModalStyle() {
//   const top = 10;
//   const left = 10;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      'margin-top': '10px',
    },
    paper: {
      position: 'relative',
      // HACK:モバイルだとレイアウトが崩壊するので要調整
      [theme.breakpoints.up('sm')]: {
        width: '80vw',
        height: '75vh',
      },
      [theme.breakpoints.up('md')]: {
        width: '40vw',
        height: '75vh',
      },
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      border: '0.1px solid lightgray',
      margin: '50px',
    },
    margin: {
      margin: theme.spacing(1),
    },
    // HACK:marginで底へcontainerを配置しているので要調整
    toBottom: {
      margin: theme.spacing(5),
    },
    // upload: {
    //   margin: '10px 40px 10px 40px',
    // },
  })
);

const ProfileOnAvatar: VFC = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">プロフィールを編集する</h2>
      <Grid container justify="center" alignItems="center">
        <Grid item sm={12} md={6} justifyContent="center">
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="ユーザー名"
              defaultValue="馬山働次郎"
              className={classes.margin}
            />
          </form>
          <TextField
            id="outlined-helperText"
            label="紹介文"
            defaultValue="毎日12時間労働！定時上がりは甘え！"
            helperText="50字以内で入力"
            variant="outlined"
            multiline
            rows={5}
            className={classes.margin}
          />
          <TextField
            id="standard-read-only-input"
            label="メールアドレス"
            defaultValue="umayama@mail.co.jp"
            InputProps={{
              readOnly: true,
            }}
            className={classes.margin}
          />
          <TextField
            id="standard-read-only-input"
            label="ユーザーID"
            defaultValue="12345678"
            className={classes.margin}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid
          container
          sm={12}
          md={6}
          justifyContent="center"
          alignItems="center"
        >
          <Avatar className={classes.large} />
          <Button variant="contained" size="large" color="primary">
            画像をアップロード
          </Button>
        </Grid>
        <Grid
          container
          sm={12}
          justifyContent="flex-end"
          alignContent="flex-end"
          className={classes.toBottom}
        >
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.margin}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
          >
            変更を保存
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <MenuItem onClick={handleOpen}>プロフィール編集</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {body}
      </Modal>
    </div>
  );
};

export default ProfileOnAvatar;
