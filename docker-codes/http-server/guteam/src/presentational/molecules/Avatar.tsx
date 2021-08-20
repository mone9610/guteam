import React, { VFC } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import ProfileOnAvatar from './ProfileOnAvatar';

const Avatar: VFC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Box display={{ xs: 'none', sm: 'none', md: 'block' }}> */}
      <Box display={{ md: 'block' }}>
        <IconButton
          color="primary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircleIcon color="action" fontSize="large" />
        </IconButton>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ProfileOnAvatar />
        <MenuItem>ログアウト</MenuItem>
      </Menu>
    </div>
  );
};

export default Avatar;
