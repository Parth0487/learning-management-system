import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import moment from 'moment';

const Announcement = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchAnnouncementList();
  }, []);

  const fetchAnnouncementList = async () => {
    fetch('http://localhost:5000/announcement', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.map((i) => {
          return { ...i, id: i.announcementId };
        });
        setTableData(list);
      })
      .catch((error) => console.error('Error fetching announcements:', error));
  };

  return (
    <PageContainer title="Announcement" description="Overview of all announcements">
      <DashboardCard title="Announcement List">
        {tableData.map((announcement) => (
          <Card key={announcement.id} variant="outlined" sx={{ mb: 2, mt: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h5" component="div">
                  {announcement.title}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  Posted on <b>{moment(announcement.date).format('MMMM Do YYYY')}</b>
                </Typography>
              </Box>
              <Typography gutterBottom>{announcement.description}</Typography>
              <Typography variant="body2">
                Sections: <b>{announcement.section} </b>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Posted by: <b>{announcement.createdByName}</b>
              </Typography>
            </CardContent>
          </Card>
        ))}
        {tableData.length === 0 && <Typography>No announcements to display.</Typography>}
      </DashboardCard>
    </PageContainer>
  );
};

export default Announcement;
