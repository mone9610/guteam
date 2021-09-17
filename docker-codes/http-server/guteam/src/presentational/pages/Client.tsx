import { VFC } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import ClientDrawer from 'presentational/template/ClientDrawer';
import Content from 'presentational/template/Content';

import CustomizedSnackbars from 'presentational/molecules/CustomizedSnackbars';
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

  const snackbarJson = useSelector((state: Store) => state.snackbar);

  return (
    <div className={classes.root}>
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
