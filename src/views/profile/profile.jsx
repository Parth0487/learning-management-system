import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import moment from 'moment';

const { REACT_APP_API } = process.env;

const MyProfile = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const { userId } = userDetails;

  const { id: studentId = 1 } = useParams();
  const [studentProfile, setStudentProfile] = useState({
    name: '',
    email: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // fetchStudentProfile();
    fetchStudentProfileAPI();
  }, []);

  // const fetchStudentProfile = async () => {
  //   let student = JSON.parse(localStorage.getItem('userDetails'));
  //   setStudentProfile(student);
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    // API call to update the user profile
    await fetch(`${REACT_APP_API}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId,
        name: formData.name,
        email: formData.email,
        userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchStudentProfileAPI();
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  const fetchStudentProfileAPI = async () => {
    // API call to update the user profile
    await fetch(`${REACT_APP_API}/user/get-user-by-id/${userId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          console.log('data.user: ', data.user);
          setStudentProfile(data.user);
          setFormData({
            name: data?.user?.name,
            email: data?.user?.email,
          });
        }
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  return (
    <PageContainer title="My Profile" description="View your personal and academic information">
      <DashboardCard title="My Profile">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Avatar sx={{ width: 90, height: 90, bgcolor: 'secondary' }}></Avatar>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {studentProfile.name || 'No name available'}
            </Typography>
            <Typography color="textSecondary">
              {studentProfile.email || 'No email available'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </Grid>
        </Grid>
        <Divider style={{ margin: '20px 0' }} />
        <List>
          {/* <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={studentProfile.email || 'No email provided'} secondary="Email" />
          </ListItem> */}
          {/* <ListItem>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                studentProfile.enrollmentDate
                  ? moment(studentProfile.enrollmentDate).format('MMMM Do YYYY')
                  : 'No enrollment date'
              }
              secondary="Enrollment Date"
            />
          </ListItem> */}
          {/* {studentProfile.courses &&
            studentProfile.courses.map((course, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={course.name} secondary={`Grade: ${course.grade}`} />
              </ListItem>
            ))} */}
        </List>
      </DashboardCard>
    </PageContainer>
  );
};

export default MyProfile;
