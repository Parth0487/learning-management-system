import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Chip,
  Divider,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import moment from 'moment';

const MyProfile = () => {
  const { id: studentId = 1 } = useParams();
  const [studentProfile, setStudentProfile] = useState({});

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    let student = JSON.parse(localStorage.getItem('userDetails'));
    setStudentProfile(student);
  };

  return (
    <PageContainer title="My Profile" description="View your personal and academic information">
      <DashboardCard title="My Profile">
        <Avatar sx={{ width: 90, height: 90, bgcolor: 'secondary.main' }}>S</Avatar>
        <Typography variant="h5" gutterBottom mt={2}>
          {studentProfile.name || 'No name available'}
        </Typography>
        <Typography color="textSecondary">
          {studentProfile.userName || 'No program data available'}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={studentProfile.email || 'No email provided'} secondary="Email" />
          </ListItem>
          <ListItem>
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
          </ListItem>
          {studentProfile.courses &&
            studentProfile.courses.map((course, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={course.name} secondary={`Grade: ${course.grade}`} />
              </ListItem>
            ))}
        </List>
      </DashboardCard>
    </PageContainer>
  );
};

export default MyProfile;
