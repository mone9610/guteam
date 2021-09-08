import React, { VFC } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { useAuth0 } from '@auth0/auth0-react';

const Avatar: VFC = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, isLoading } = useAuth0();
  const { logout } = useAuth0();

  const useStyles = makeStyles(() =>
    createStyles({
      imgCircle: {
        'border-radius': '50%',
        width: '40px',
        height: '40px',
      },
    })
  );

  const classes = useStyles();

  return (
    <div>
      {isLoading ? (
        <></>
      ) : (
        <>
          <Box display={{ md: 'block' }}>
            <IconButton
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <img
                src={user?.picture}
                alt={user?.name}
                className={classes.imgCircle}
              />
            </IconButton>
          </Box>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => history.push('/client/profile')}>
              {user?.name}を編集
            </MenuItem>
            <MenuItem onClick={() => logout()}>ログアウト</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default Avatar;
