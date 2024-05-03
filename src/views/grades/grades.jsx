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

const Quiz = () => {
  const [tableData, setTableData] = useState([]);
  const [value, setValue] = React.useState('1');

  useEffect(() => {
    fetchQuizList();
  }, []);

  const fetchQuizList = async () => {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));

    fetch('http://localhost:5000/grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify({
        userId: userDetails.userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.map((i) => {
          return { ...i, id: i.quizId };
        });

        setTableData(list);
      });
  };

  const columns = [
    {
      field: 'quizTitle',
      headerName: 'Quiz Name',
      width: 150,
    },
    { field: 'quizDescription', headerName: 'Description', width: 350 },
    {
      field: 'date',
      headerName: 'Due Date',
      renderCell: (params) => (
        <>
          <Typography variant="caption">
            {moment(params.row.quizDate).format('MMM DD ')} by{' '}
            {moment(params.row.quizDate).format('hh:mm a ')}
          </Typography>
          <br />
        </>
      ),
      width: 140,
    },
    {
      field: 'date1',
      headerName: 'Submitted On',
      renderCell: (params) => (
        <>
          <Typography variant="caption">
            {moment(params.row.quizDate).format('MMM DD ')} at{' '}
            {moment(params.row.quizDate).format('hh:mm a ')}
          </Typography>
        </>
      ),
      width: 140,
    },
    {
      field: 'score',
      headerName: 'Score',
      renderCell: (params) => (
        <>
          <Typography variant="caption">
            {params.row.score} / {params.row.quizPoint}
          </Typography>
        </>
      ),
      width: 80,
    },
  ];

  return (
    <PageContainer title="Grades" description="this is Sample page">
      <DashboardCard title="My Grades">
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowId={(row) => row.gradeId}
          getRowHeight={() => 'auto'}
          sx={{
            minHeight: '300px',
            '& .MuiDataGrid-row': {
              borderTop: '1px solid #ccc', // Adds a border around each row
              py: 1,
            },
          }}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default Quiz;
