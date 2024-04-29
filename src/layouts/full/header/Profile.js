import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
} from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';

import StudentImg from 'src/assets/images/profile/student.jpg';
import AdminImg from 'src/assets/images/profile/admin.png';
import FacultyImg from 'src/assets/images/profile/faculty.png';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [user, setUser] = useState({});
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUser(userDetails);
  }, []);

  const getUserType = () => {
    if (user && user.userTypeCode === 'ADMIN') {
      return <Chip variant="outlined" label={user.userTypeCode} color="primary" />;
    }

    if (user && user.userTypeCode === 'FACULTY') {
      return <Chip variant="outlined" label={user.userTypeCode} color="secondary" />;
    }

    if (user && user.userTypeCode === 'STUDENT') {
      return <Chip variant="outlined" label={user.userTypeCode} color="success" />;
    }

    return <Chip variant="outlined" label="Unknown" color="success" />;
  };

  const getUserTypeIcon = () => {
    if (user && user.userTypeCode === 'ADMIN') {
      return AdminImg;
    }

    if (user && user.userTypeCode === 'FACULTY') {
      return FacultyImg;
    }

    if (user && user.userTypeCode === 'STUDENT') {
      return StudentImg;
    }

    return AdminImg;
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        {/* <Typography>{user.userName}</Typography> */}
        <Avatar
          src={getUserTypeIcon()}
          alt={getUserTypeIcon()}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '250px',
          },
        }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem> */}

        <Box mt={1} py={1} px={2}>
          <Typography align="center">Account Type: &nbsp; {getUserType()}</Typography>
        </Box>
        <Box mt={1} py={1} px={2}>
          <Button to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
