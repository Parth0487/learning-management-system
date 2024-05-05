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

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: null,
    point: '',
    questions: '',
    courseId: '',
  });

  const [courseList, setCourseList] = useState([]);

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, date: newValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch(`${REACT_APP_API}/create-quiz`, {
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
          alert('Quiz added!');
        }
      })
      .catch((error) => console.error('Error loading the quiz data:', error));
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
    <PageContainer title="Create Quiz" description="Add a new assignment">
      <DashboardCard title="Create Quiz">
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
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Questions"
                value={formData.questions}
                onChange={handleChange('questions')}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="semester-select-label" required>
                  Course
                </InputLabel>
                <Select
                  fullWidth
                  label="Course"
                  value={formData.courseId}
                  onChange={handleChange('courseId')}
                  input={<OutlinedInput label="Course" required />}
                  required
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {courseList.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 'auto' }} // Only take the width necessary for text
              >
                Create Quiz
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateQuiz;
