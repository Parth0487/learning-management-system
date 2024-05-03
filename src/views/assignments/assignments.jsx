import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from 'react-router-dom';
import { IconPlus } from '@tabler/icons';

const Assignments = () => {
  const [tableData, setTableData] = useState({
    upcoming: [],
    past: [],
  });
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    fetch('http://localhost:5000/assignment', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.map((i) => {
          return { ...i, id: i.assignmentInd };
        });

        let upcoming = [];
        let past = [];

        // Current date
        const today = moment();

        // Iterate over the assignments and categorize them
        list.forEach((assignment) => {
          const dueDate = moment(assignment.date);
          if (dueDate.isAfter(today)) {
            upcoming.push(assignment);
          } else {
            past.push(assignment);
          }
        });

        setTableData({
          upcoming,
          past,
        });
      });
  };

  const columns = [
    { field: 'assignmentId', headerName: 'ID', width: 50 },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params) => (
        <Typography
          fontSize={13}
          variant="body1"
          textAlign="right"
          component={Link}
          to={`/assignments/view/${params.row.assignmentId}`}
          sx={{ color: '#000' }}
        >
          {params.row.title}
        </Typography>
      ),
    },
    { field: 'description', headerName: 'Description', width: 400 },
    {
      field: 'date',
      headerName: 'Date',
      renderCell: (params) => (
        <>
          <Typography variant="caption">{moment(params.row.date).format('yyyy-MM-DD')}</Typography>
        </>
      ),
    },
    {
      field: 'isPublished',
      headerName: 'Status',
      renderCell: (params) => (
        <>
          <Typography variant="caption">
            {params.row.isPublished === 'yes' ? 'Published' : 'Not Published'}
          </Typography>
        </>
      ),
    },
  ];

  return (
    <PageContainer title="Assignments" description="this is Sample page">
      <DashboardCard title="">
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h6"> Assignments</Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/assignments/create"
            startIcon={<IconPlus />}
          >
            Create Assignment
          </Button>
        </Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upcoming Assignments" value="1" />
              <Tab label="Past Assignments" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" p={0}>
            <DataGrid
              rows={tableData.upcoming}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              getRowId={(row) => row.assignmentId}
              getRowHeight={() => 'auto'}
              sx={{
                border: '1px solid #ccc',
                // p: 1,
                minHeight: '300px',
                '& .MuiDataGrid-row': {
                  borderTop: '1px solid #ccc', // Adds a border around each row
                  py: 2,
                },
              }}
            />
          </TabPanel>
          <TabPanel value="2">
            <DataGrid
              rows={tableData.past}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              getRowId={(row) => row.assignmentId}
              getRowHeight={() => 'auto'}
              sx={{
                border: '1px solid #ccc',
                // p: 1,
                minHeight: '300px',
                '& .MuiDataGrid-row': {
                  borderTop: '1px solid #ccc', // Adds a border around each row
                  py: 2,
                },
              }}
            />
          </TabPanel>
        </TabContext>
      </DashboardCard>
    </PageContainer>
  );
};

export default Assignments;
