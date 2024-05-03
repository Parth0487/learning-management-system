import React, { useEffect, useState } from 'react';
import { Typography, Chip, Divider, Box, FormControlLabel, Switch } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import { useParams } from 'react-router';
import moment from 'moment'; // Ensure moment is installed or use native Date methods

const AssignmentDetails = () => {
  const params = useParams();
  const { id: assignmentId = 1 } = params;
  const [assignment, setAssignment] = useState({});

  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    fetchAssignmentDetails();
  }, []);

  const fetchAssignmentDetails = async () => {
    fetch(`http://localhost:5000/assignment/${assignmentId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setAssignment(data);
      })
      .catch((error) => console.error('Error loading the assignment data:', error));
  };

  const handlePublishChange = (event) => {
    setIsPublished(event.target.checked);
    // Optionally, update the publish status on the server here
  };

  // Check if the assignment is upcoming or past
  const isUpcoming = (dueDate) => {
    return moment(dueDate).isAfter(moment());
  };

  return (
    <PageContainer title="Assignment Details" description="Detailed view of assignment">
      <DashboardCard title="Assignment Details">
        <Typography variant="h5" gutterBottom>
          {assignment.title || 'No title available'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {assignment.description || 'No description available'}
        </Typography>
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
        <FormControlLabel
          control={<Switch checked={isPublished} onChange={handlePublishChange} />}
          label="Publish"
        />
        <Typography variant="body1">
          Additional details like submission guidelines, grading criteria, and resource materials
          can be added here. This text serves as placeholder content to fill the page and offer a
          complete look.
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AssignmentDetails;
