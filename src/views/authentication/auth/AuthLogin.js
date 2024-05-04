import React, { useState } from 'react';
import { Box, Typography, Button, Stack, TextField, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(formData); // Implement your submit logic here

    fetch(`http://localhost:5000/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          let userDetails = data.user;
          localStorage.setItem('userDetails', JSON.stringify(data.user));

          if (userDetails.userTypeCode === 'ADMIN') {
            navigate('/courses');
            return;
          }

          if (userDetails.userTypeCode === 'STUDENT') {
            navigate('/announcements');
            return;
          }

          if (userDetails.userTypeCode === 'FACULTY') {
            navigate('/');
            return;
          }

          navigate('/');
        } else {
          alert('Invalid Credentials');
        }
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box component="form" onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                value={formData.title}
                onChange={handleChange('email')}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                value={formData.point}
                onChange={handleChange('password')}
                type="password"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                // component={Link}
                // to="/"
                type="submit"
                // onClick={() => handleLogin()}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      {subtitle}
    </>
  );
};

export default AuthLogin;
