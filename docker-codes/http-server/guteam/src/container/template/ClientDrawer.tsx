// HACK : VScode上は問題ないが、Redux ToolKit利用時、コンパイルエラーが発生するため、以下のオプションを許容
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { VFC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TitleState } from 'common/features/pageTitleSlice';

import {
  setCommunityOpen,
  // setTeamOpen,
  // setDirectOpen,
  setSettingOpen,
  setDocOpen,
} from 'common/features/accordionSlice';
import { CommunityData, Store } from 'common/CustomTypes';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TimelineIcon from '@material-ui/icons/Timeline';
import MenuIcon from '@material-ui/icons/Menu';
import ForumIcon from '@material-ui/icons/Forum';
// import GroupIcon from '@material-ui/icons/Group';
// import EmailIcon from '@material-ui/icons/Email';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useAuth0 } from '@auth0/auth0-react';

import Collapse from '@material-ui/core/Collapse';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

import CommunityList from 'presentational/organisms/CommunityList';

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
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    appbarIcon: {
      marginRight: theme.spacing(4),
    },
  })
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const ClientDrawer: VFC<Props> = (props) => {
  const history = useHistory();
  const { logout } = useAuth0();
  // eslint-disable-next-line react/prop-types
  const { window } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // NOTE:タイトル初期化用
  const titleJson = useSelector((state: TitleState) => state.title);
  const title = Object.values(titleJson)[0];

  // NOTE:サイドバーのメニューを制御する
  const accordionJson = useSelector((state: Store) => state.accordion);
  const communityOpen = accordionJson?.communityOpen;
  const communityList = accordionJson?.communityList;
  // const teamOpen = accordionJson?.teamOpen;
  // const directOpen = accordionJson?.directOpen;
  const settingOpen = accordionJson?.settingOpen;
  const docOpen = accordionJson?.docOpen;
  const handleClickCommunity = () => {
    dispatch(setCommunityOpen(!communityOpen));
  };
  // const handleClickTeam = () => {
  //   dispatch(setTeamOpen(!teamOpen));
  // };
  // const handleClickDirect = () => {
  //   dispatch(setDirectOpen(!directOpen));
  // };
  const handleClickSetting = () => {
    dispatch(setSettingOpen(!settingOpen));
  };
  const handleClickDocs = () => {
    dispatch(setDocOpen(!docOpen));
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={Link} to="/client/timeline">
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="タイムライン" />
        </ListItem>
        <ListItem button onClick={handleClickCommunity}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="コミュニティ" />
          {communityOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* <Collapse in={communityOpen} timeout="auto" unmountOnExit> */}
        <Collapse in={communityOpen} timeout="auto">
          <CommunityList menu={communityList as CommunityData[]} />
        </Collapse>
        {/* <ListItem button onClick={handleClickTeam}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="チーム" />
          {teamOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={teamOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="工事中" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleClickDirect}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="ダイレクト" />
          {directOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={directOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="工事中" />
            </ListItem>
          </List>
        </Collapse> */}
        <Divider />
        <ListItem button onClick={() => history.push('/client/notification')}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="お知らせ" />
        </ListItem>
        <ListItem button onClick={handleClickSetting}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="設定" />
          {settingOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={settingOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => history.push('/client/profile')}
            >
              <ListItemText primary="プロフィール編集" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => logout()}
            >
              <ListItemText primary="ログアウト" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem button onClick={handleClickDocs}>
          <ListItemIcon>
            <WebAssetIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="" secondary="愚痴〜ムについて" />
          {docOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={docOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => history.push('/docs/terms')}
            >
              <ListItemText secondary="利用規約" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => history.push('/docs/policies')}
            >
              <ListItemText secondary="個人情報保護方針" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {/* <Avatar /> */}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default ClientDrawer;
