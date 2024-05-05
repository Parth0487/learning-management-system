import React, { useEffect, useState } from 'react';
import { Typography, Chip, Divider, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useParams } from 'react-router-dom'; // Correct import for useParams
import moment from 'moment'; // Ensure moment is installed or use native Date methods

const { REACT_APP_API } = process.env;

const QuizDetails = () => {
  const { id: quizId = 1 } = useParams();
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const fetchQuizDetails = async () => {
    fetch(`REACT_APP_API/quiz/${quizId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => console.error('Error loading the quiz data:', error));
  };

  // Check if the quiz is upcoming or past
  const isUpcoming = (dueDate) => moment(dueDate).isAfter(moment());

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
      </DashboardCard>
    </PageContainer>
  );
};

export default QuizDetails;
