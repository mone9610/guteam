import { VFC } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

import LogoMedium from '../../assets/img/logo_medium.jpg';
import SignUpButton from '../molecules/SignUpButton';
import LoginButton from '../molecules/LoginButton';
import EasyLoginButton from '../molecules/EasyLoginButton';

const Header: VFC = () => (
  <div>
    <AppBar position="static" color="transparent" id="top">
      <Toolbar>
        <Box m={2}>
          <img src={LogoMedium} alt="Logo" />
        </Box>
        <div style={{ flexGrow: 1 }} />
        <Box m={2} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <EasyLoginButton />
        </Box>
        <Box m={2} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <SignUpButton />
        </Box>
        <Box m={2} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <LoginButton />
        </Box>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
