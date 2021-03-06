import { VFC } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import ClientDrawer from 'container/template/ClientDrawer';
import Content from 'presentational/template/Content';

import CustomizedSnackbars from 'presentational/molecules/CustomizedSnackbars';
import ProfileModal from 'presentational/organisms/ProfileModal';

import { useSelector } from 'react-redux';

import { UserType, StoreType } from 'common/CustomTypes';
import { useCommunities } from 'common/CustomHooks';

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
  const snackbarJson = useSelector((state: StoreType) => state.snackbar);
  // HACK : VScode上は問題ないが、コンパイル時にエラーが発生するため、以下のオプションを許容
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  const profileModalJson = useSelector(
    (state: StoreType) => state.profileModal
  );
  void useCommunities();
  return (
    <div className={classes.root}>
      <ProfileModal
        // HACK : VScode上は問題ないが、コンパイル時にエラーが発生するため、以下のオプションを許容
        /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
        open={profileModalJson?.open as boolean}
        user={profileModalJson?.user as UserType}
      />
      <CustomizedSnackbars
        open={snackbarJson?.open as boolean}
        type={snackbarJson?.type as string}
        message={snackbarJson?.message as string}
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
