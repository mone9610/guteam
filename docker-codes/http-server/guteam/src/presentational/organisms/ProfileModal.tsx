// FC内のpropsの型定義は冗長であるため、無効化
/* eslint-disable react/prop-types */
// railsから取得するjsonの命名規則はキャメルケースであるため、無効化
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { VFC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useDispatch } from 'react-redux';

import { UserType } from 'common/CustomTypes';
import { setProfileModalOpen } from 'common/features/profileModalSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10px',
    },
    paper: {
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        width: '75vw',
        height: '75vh',
      },
      [theme.breakpoints.up('md')]: {
        width: '75vw',
        height: '80vh',
      },
      [theme.breakpoints.up('lg')]: {
        width: '40vw',
        height: '85vh',
      },
      [theme.breakpoints.up('xl')]: {
        width: '40vw',
        height: '75vh',
      },
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2),
    },
    imgCircleEditable: {
      borderRadius: '50%',
      width: '100px',
      height: '100px',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(2, 0, 2),
    },
    textField: {
      width: '30ch',
    },
  })
);

type Props = {
  open: boolean;
  user?: UserType;
};

// 戻り値の型は定義不要
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ProfileModal: VFC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { open, user } = props;
  const classes = useStyles();

  // HACK:モーダルのクローズをpresentatinalで管理している
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setProfileModalOpen(false));
  };

  //   モーダル内のプロフィール
  const body = (
    <div className={classes.paper}>
      <Grid container className={classes.container}>
        <Typography component="span" variant="h6" color="textPrimary">
          プロフィール
        </Typography>
      </Grid>
      <Grid container className={classes.container}>
        <img
          src={user?.image_url}
          alt=""
          className={classes.imgCircleEditable}
        />
      </Grid>
      <Grid container className={classes.container}>
        <TextField
          label="ユーザー名"
          defaultValue={user?.name}
          className={classes.textField}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid container className={classes.container}>
        <TextField
          label="紹介文"
          defaultValue={user?.introduction}
          variant="outlined"
          multiline
          rows={10}
          className={classes.textField}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid container className={classes.container}>
        <TextField
          label="ユーザーID"
          defaultValue={user?.sub}
          className={classes.textField}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      {body}
    </Modal>
  );
};

export default ProfileModal;
