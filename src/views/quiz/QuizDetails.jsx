import React, { useEffect, useState } from 'react';
import {
  Typography,
  Chip,
  Divider,
  Box,
  Grid,
  TextField,
  Stack,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useParams } from 'react-router-dom'; // Correct import for useParams
import moment from 'moment'; // Ensure moment is installed or use native Date methods
import { DataGrid } from '@mui/x-data-grid';

const QuizDetails = () => {
  const { id: quizId = 1 } = useParams();
  const [quiz, setQuiz] = useState({});

  const [studentList, setStudentList] = useState({});

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  useEffect(() => {
    if (quiz && quiz.courseId) {
      fetchStudentsForCourse(quiz.courseId);
    }
  }, [quiz]);

  const fetchQuizDetails = async () => {
    fetch(`http://localhost:5000/quiz/${quizId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => console.error('Error loading the quiz data:', error));
  };

  const fetchStudentsForCourse = (courseId) => {
    fetch(`http://localhost:5000/student-score-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify({
        quizId,
        courseId: quiz.courseId,
        type: 'quiz',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudentList(data);
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  // Check if the quiz is upcoming or past
  const isUpcoming = (dueDate) => moment(dueDate).isAfter(moment());

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
      fetch(`http://localhost:5000/update-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score,
          userId,
          referenceId: quizId,
          type: 'quiz',
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

  const handlePublishChange = (event) => {
    fetch(`http://localhost:5000/quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isPublished: quiz.isPublished === 'yes' ? 'no' : 'yes',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchQuizDetails();
        // setAssignment(data);
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
    // setIsPublished(event.target.checked);
  };

  return (
    <PageContainer title="Quiz Details" description="Detailed view of the quiz">
      <DashboardCard title="Quiz Details">
        <Typography variant="h5" gutterBottom>
          {quiz.title || 'No title available'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {quiz.description || 'No description available'}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Due: {quiz.date ? moment(quiz.date).format('MMMM Do YYYY') : 'No due date'}
        </Typography>
        <Chip
          label={isUpcoming(quiz.date) ? 'Upcoming' : 'Past'}
          color={isUpcoming(quiz.date) ? 'primary' : 'error'}
          size="small"
        />
        {quiz.point && (
          <Typography variant="subtitle1" style={{ marginTop: 8 }}>
            Points: {quiz.point}
          </Typography>
        )}
        {quiz.questions && (
          <Typography variant="subtitle1" style={{ marginTop: 8 }}>
            Number of Questions: {quiz.questions}
          </Typography>
        )}
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1">
          Additional details like submission guidelines, grading criteria, and resource materials
          can be added here. This text serves as placeholder content to fill the page and offer a
          complete look.
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <FormControlLabel
          control={<Switch checked={quiz.isPublished === 'yes'} onChange={handlePublishChange} />}
          label={quiz.isPublished === 'yes' ? 'Published' : 'Not Published'}
          disabled={!isUpcoming(quiz.date)}
        />

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
      </DashboardCard>
    </PageContainer>
  );
};

export default QuizDetails;
