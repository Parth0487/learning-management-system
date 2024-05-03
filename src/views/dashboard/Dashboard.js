import React from 'react';
import { Grid, Box, Card, CardContent, Typography, Divider } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

const Dashboard = () => {
  const upcomingEvents = [
    {
      title: 'Quiz: Software Design Patterns',
      date: 'May 15, 2024',
      details: 'Covering basic to advanced design patterns.',
    },
    {
      title: 'Assignment: Software Testing Techniques',
      date: 'May 22, 2024',
      details: 'Focus on unit and integration testing.',
    },
  ];

  const recentNews = [
    {
      title: 'Guest Lecture',
      date: 'June 10, 2024',
      details: 'Topic: Agile Methodologies with industry experts.',
    },
    {
      title: 'Hackathon',
      date: 'July 5, 2024',
      details: 'Annual hackathon with a focus on open-source contributions.',
    },
  ];

  const tasks = [
    {
      title: 'Complete Project Proposal',
      dueDate: 'May 30, 2024',
      details: 'Proposals for the end-of-semester projects are due.',
    },
  ];

  const achievements = [
    {
      title: 'CodeFest Winners',
      date: 'April 2024',
      details: 'Congratulations to the winning team of this year’s CodeFest!',
    },
  ];

  const renderCards = (data) =>
    data.map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card raised>
          <CardContent>
            <Typography variant="h5" color="primary">
              {item.title}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">{item.details}</Typography>
            <Typography variant="body2" color="textSecondary">
              Date: <b>{item.date || item.dueDate}</b>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Upcoming Events
            </Typography>
            <Grid container spacing={2}>
              {renderCards(upcomingEvents)}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Tasks To Complete
            </Typography>
            <Grid container spacing={2}>
              {renderCards(tasks)}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Recent News
            </Typography>
            <Grid container spacing={2}>
              {renderCards(recentNews)}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Recent Achievements
            </Typography>
            <Grid container spacing={2}>
              {renderCards(achievements)}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
