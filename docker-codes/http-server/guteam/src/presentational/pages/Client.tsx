import { VFC, createContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import ClientDrawer from '../template/ClientDrawer';
import Content from '../template/Content';

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

export const TokenContext = createContext('');
export const LoadingContext = createContext(true);

const Client: VFC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LoadingContext.Provider value>
        <ClientDrawer />
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Content />
        </main>
      </LoadingContext.Provider>
    </div>
  );
};

export default Client;
