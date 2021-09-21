import { VFC } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import ClientDrawer from 'presentational/template/ClientDrawer';
import Content from 'presentational/template/Content';

import CustomizedSnackbars from 'presentational/molecules/CustomizedSnackbars';
import ProfileModal from 'presentational/organisms/ProfileModal';

import { useSelector } from 'react-redux';

import { Store } from 'common/CustomTypes';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
  })
);

const Client: VFC = () => {
  const classes = useStyles();

  // HACK:ロジック部分がpresentationalに混在しているが、snackbarStateをpropsに変更する必要性が疑問であるため許容
  const snackbarJson = useSelector((state: Store) => state.snackbar);
  // HACK : VScode上は問題ないが、コンパイル時にエラーが発生するため、以下のオプションを許容
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  const profileModalJson = useSelector((state: Store) => state.profileModal);

  return (
    <div className={classes.root}>
      <ProfileModal
        // HACK : VScode上は問題ないが、コンパイル時にエラーが発生するため、以下のオプションを許容
        /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
        open={profileModalJson?.open}
        user={profileModalJson?.user}
      />
      <CustomizedSnackbars
        open={snackbarJson?.open}
        type={snackbarJson?.type}
        message={snackbarJson?.message}
      />
      <ClientDrawer />
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content />
      </main>
    </div>
  );
};

export default Client;
