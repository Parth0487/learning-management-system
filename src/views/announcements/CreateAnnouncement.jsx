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
import moment from 'moment';
import { getLoggedInUserDetails } from 'src/utils/common';
const { REACT_APP_API } = process.env;

const CreateAnnouncement = () => {
  // const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const userDetails = getLoggedInUserDetails();

  const { userId } = userDetails;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    section: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let req = {
      ...formData,
      date: moment(new Date()),
      createdBy: userId,
    };

    fetch(`${REACT_APP_API}/announcement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify(req),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status === 200) {
          navigate(-1);
          alert('Announcement posted added!');
        }
      })
      .catch((error) => console.error('Error posting the announcement data:', error));
  };

  return (
    <PageContainer title="Create Assignment" description="Add a new assignment">
      <DashboardCard title="Create Announcement">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Title"
                value={formData.title}
                onChange={handleChange('title')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                value={formData.description}
                onChange={handleChange('description')}
                multiline
                rows={8}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Section"
                value={formData.section}
                onChange={handleChange('section')}
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 'auto' }} // Only take the width necessary for text
              >
                Post Announcement
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateAnnouncement;
