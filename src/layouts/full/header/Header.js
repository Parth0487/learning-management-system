import React from 'react';
import { Box, AppBar, Toolbar, styled, IconButton, Badge, Stack, Divider } from '@mui/material';
import PropTypes from 'prop-types';

import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons';

const Header = (props) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
    // Ensure AppBar stretches full width and no horizontal overflow
    width: '100%',
    margin: 0,
    padding: 0,
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    margin: 0, // Remove margins that might push the width beyond the viewport
    padding: 0, // Use padding carefully to avoid horizontal scroll
    display: 'flex',
    justifyContent: 'space-between', // Ensures elements are spaced evenly
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        {/* <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton> */}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
