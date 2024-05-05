import React, { useEffect, useState } from 'react';
import {
  Typography,
  Chip,
  Divider,
  Box,
  FormControlLabel,
  Switch,
  Grid,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import { useParams } from 'react-router';
import moment from 'moment'; // Ensure moment is installed or use native Date methods
import { DataGrid } from '@mui/x-data-grid';
const { REACT_APP_API } = process.env;

const AssignmentDetails = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const { userTypeCode = null } = userDetails;

  const params = useParams();
  const { id: assignmentId = 1 } = params;
  const [assignment, setAssignment] = useState({});

  const [studentList, setStudentList] = useState({});

  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchAssignmentDetails();
  }, []);

  useEffect(() => {
    if (assignment && assignment.courseId) {
      fetchStudentsForCourse(assignment.courseId);
    }
  }, [assignment]);

  const fetchAssignmentDetails = async () => {
    fetch(`${REACT_APP_API}/assignment/${assignmentId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.description);
        setAssignment(data);
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
  };

  const fetchStudentsForCourse = (courseId) => {
    fetch(`${REACT_APP_API}/student-score-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify({
        assignmentId,
        courseId: assignment.courseId,
        type: 'assignment',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudentList(data);
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  const publishAssignment = async () => {
    let status = assignment.isPublished === 'yes' ? 'no' : 'yes';

    fetch(`${REACT_APP_API}/publish-assignment/${assignmentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify({
        status,
        assignmentId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
  };

  const handlePublishChange = (event) => {
    fetch(`${REACT_APP_API}/assignment/${assignmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isPublished: assignment.isPublished === 'yes' ? 'no' : 'yes',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchAssignmentDetails();
        // setAssignment(data);
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
    // setIsPublished(event.target.checked);
  };

  // Check if the assignment is upcoming or past
  const isUpcoming = (dueDate) => {
    return moment(dueDate).isAfter(moment());
  };

  const columns = [
    {
      field: 'userId',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'score',
      headerName: 'Score',
      renderCell: (params) => (
        <Stack direction={'row'} spacing={2}>
          <TextField
            type="number"
            size="small"
            value={params.row.score}
            onChange={(e) => handleScoreChange(e.target.value, params.id)}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Button variant="contained" onClick={() => submitScore(params.row)}>
            Submit
          </Button>
        </Stack>
      ),
      // minWidth: 150,
      flex: 1,
    },
  ];

  const handleScoreChange = (value, id) => {
    const newStudentList = studentList.map((student) => {
      if (student.userId === id) {
        return { ...student, score: value };
      }
      return student;
    });
    setStudentList(newStudentList);
  };

  const submitScore = async (data) => {
    const { userId, score } = data;

    try {
      // Call your API here. This is a placeholder for your API endpoint and method.
      fetch(`${REACT_APP_API}/update-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score,
          userId,
          referenceId: assignmentId,
          type: 'assignment',
          date: moment(new Date()),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.success) {
            alert('Success');
          }
          // setAssignment(data);
        })
        .catch((error) => console.error('Error loading the assignment data:', error));

      // Handle response from the server
      console.log('Response from server: ', data);
    } catch (error) {
      console.error('Error updating score: ', error);
    }
  };

  const updateContent = () => {
    let req = { description, type: 'assignment', id: assignmentId };

    fetch(`${REACT_APP_API}/update-content`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify(req),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          alert('Content Updated!');
        }

        fetchAssignmentDetails();
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  return (
    <PageContainer title="Assignment Details" description="Detailed view of assignment">
      <DashboardCard title="Assignment Details">
        <Typography variant="h5" gutterBottom>
          {assignment.title || 'No title available'}
        </Typography>
        <Grid item xs={12}>
          {/* <Typography variant="body1" gutterBottom>
              {courseData.description || 'No description available'}
            </Typography> */}
          <Typography>Content</Typography>
          <TextField
            fullWidth
            value={description}
            multiline
            rows={20}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!(userTypeCode === 'FACULTY')}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000000',
              },
            }}
          />
        </Grid>
        {userTypeCode === 'FACULTY' ? (
          <Grid item xs={12} textAlign={'end'} mt={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={assignment.description === description}
              onClick={() => {
                updateContent();
              }}
            >
              {' '}
              Update Content{' '}
            </Button>
          </Grid>
        ) : null}
        {/* <Typography variant="body1" gutterBottom>
          {assignment.description || 'No description available'}
        </Typography> */}
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Due: {assignment.date ? moment(assignment.date).format('MMMM Do YYYY') : 'No due date'}
        </Typography>
        <Chip
          label={isUpcoming(assignment.date) ? 'Upcoming' : 'Past'}
          color={isUpcoming(assignment.date) ? 'primary' : 'error'}
          size="small"
        />
        {assignment.point && (
          <Typography variant="subtitle1" style={{ marginTop: 8 }}>
            Points: {assignment.point}
          </Typography>
        )}
        <Divider style={{ margin: '20px 0' }} />
        {['STUDENT'].includes(userTypeCode) ? null : (
          <FormControlLabel
            control={
              <Switch checked={assignment.isPublished === 'yes'} onChange={handlePublishChange} />
            }
            label={assignment.isPublished === 'yes' ? 'Published' : 'Not Published'}
            disabled={!isUpcoming(assignment.date)}
          />
        )}
        <Typography variant="body1">
          Additional details like submission guidelines, grading criteria, and resource materials
          can be added here. This text serves as placeholder content to fill the page and offer a
          complete look.
        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />

        {/* <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained">Assign Grades</Button>
          </Grid>
        </Grid> */}
        {['STUDENT'].includes(userTypeCode) ? null : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <Typography variant="h6">Student List</Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <DataGrid
                rows={studentList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                getRowId={(row) => row.userId}
                getRowHeight={() => 'auto'}
                sx={{
                  border: '1px solid #ccc',
                  // p: 1,
                  minHeight: '300px',
                  '& .MuiDataGrid-row': {
                    borderTop: '1px solid #ccc', // Adds a border around each row
                    py: 2,
                  },
                  '& .MuiDataGrid-cell:focus-within': {
                    outline: 'none', // Disables the blue outline on cell focus
                  },
                  // Optional: you can also apply a style to prevent the input from showing a focus outline
                  // '& input:focus': {
                  //   outline: 'none', // This will prevent the text field from showing an outline when focused
                  // },
                }}
              />
            </Grid>
          </Grid>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default AssignmentDetails;
