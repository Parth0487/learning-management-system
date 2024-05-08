import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Divider,
} from '@mui/material';

import { IconListCheck, IconMail, IconUser } from '@tabler/icons';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';

import StudentImg from 'src/assets/images/profile/student.jpg';
import AdminImg from 'src/assets/images/profile/admin.png';
import FacultyImg from 'src/assets/images/profile/faculty.png';
import { getLoggedInUserDetails } from 'src/utils/common';

const Profile = () => {
  // const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userDetails = getLoggedInUserDetails();

  const { userTypeCode = null } = userDetails;

  const navigate = useNavigate();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [user, setUser] = useState({});
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    // let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let userDetails = getLoggedInUserDetails();
    setUser(userDetails);
  }, []);

  const getUserType = () => {
    if (user && user.userTypeCode === 'ADMIN') {
      return <Chip variant="filled" label={user.userTypeCode} color="primary" />;
    }

    if (user && user.userTypeCode === 'FACULTY') {
      return <Chip variant="filled" label={user.userTypeCode} color="warning" />;
    }

    if (user && user.userTypeCode === 'STUDENT') {
      return <Chip variant="filled" label={user.userTypeCode} color="success" />;
    }

    return <Chip variant="filled" label="Unknown" color="success" />;
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
            border: '1px solid lightgrey',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={getUserTypeIcon()}
          alt={getUserTypeIcon()}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

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
            border: '1px solid lightgrey',
          },
        }}
      >
        <MenuItem
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon> */}
          <Typography>Login Type</Typography>
          <b>{getUserType()}</b>
        </MenuItem>

        <Divider />
        {userTypeCode === 'STUDENT' ? (
          <MenuItem
            onClick={() => {
              navigate('/profile');
            }}
          >
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
        ) : null}

        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              localStorage.removeItem('userDetails');
              navigate('/auth/login');
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
