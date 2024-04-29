import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router';

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: null,
    point: '',
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, date: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData); // Implement your submit logic here

    fetch(`http://localhost:5000/faculty/assignment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status === 200) {
          navigate(-1);
          alert('Assignment added!');
        }
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
  };

  return (
    <PageContainer title="Create Assignment" description="Add a new assignment">
      <DashboardCard title="New Assignment Form">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Title"
                value={formData.title}
                onChange={handleChange('title')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                value={formData.description}
                onChange={handleChange('description')}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  inputFormat="MM/DD/YYYY"
                  value={formData.date}
                  onChange={handleDateChange}
                  renderInput={(props) => <TextField {...props} fullWidth required />}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Points"
                value={formData.point}
                onChange={handleChange('point')}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 'auto' }} // Only take the width necessary for text
              >
                Create Assignment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateAssignment;
