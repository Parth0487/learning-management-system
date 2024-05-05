import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router';

const { REACT_APP_API } = process.env;

const userTypeList = [
  {
    label: 'FACULTY',
    userType: 2,
  },
  {
    label: 'STUDENT',
    userType: 3,
  },
];

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    password: '',
  });

  const [courseList, setCourseList] = useState([]);

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch(`${REACT_APP_API}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status === 200) {
          alert('User Created!');

          setFormData({
            name: '',
            email: '',
            userType: '',
            password: '',
          });
        }
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
  };

  useEffect(() => {
    fetchCourseList();
  }, []);

  const fetchCourseList = async () => {
    fetch(`${REACT_APP_API}/course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify({
        semester: [],
        faculty: [],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length) {
          let list = data.map((i) => {
            return { ...i, id: i.courseId };
          });

          setCourseList(list);
        }
      });
  };

  return (
    <PageContainer title="Create User" description="Add a new assignment">
      <DashboardCard title="Create User">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                required
                fullWidth
                label="Name"
                value={formData.name}
                onChange={handleChange('name')}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                required
                fullWidth
                label="Email"
                value={formData.email}
                onChange={handleChange('email')}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="semester-select-label" required>
                  User Type
                </InputLabel>
                <Select
                  fullWidth
                  label="User Type"
                  value={formData.userType}
                  onChange={handleChange('userType')}
                  input={<OutlinedInput label="User Type" required />}
                  required
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {userTypeList.map((course) => (
                    <MenuItem key={course.userType} value={course.userType}>
                      {course.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                required
                fullWidth
                label="Password"
                value={formData.password}
                onChange={handleChange('password')}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 'auto' }} // Only take the width necessary for text
              >
                Create User
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateUser;
