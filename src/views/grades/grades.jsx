import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

const Quiz = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchQuizList();
  }, []);

  const fetchQuizList = async () => {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));

    fetch('http://localhost:5000/score', {
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
      field: 'scoreId',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
    },
    // { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'type',
      headerName: 'Type',
      renderCell: (params) => (
        <>
          <Typography>{params.row.type === 'quiz' ? 'Quiz' : 'Assignment'}</Typography>
          <br />
        </>
      ),
      width: 140,
    },
    {
      field: 'date',
      headerName: 'Date',
      renderCell: (params) => (
        <>
          <Typography variant="caption">{moment(params.row.date).format('yyyy-MM-DD')}</Typography>
        </>
      ),
      width: 140,
    },
    // {
    //   field: 'date1',
    //   headerName: 'Submitted On',
    //   renderCell: (params) => (
    //     <>
    //       <Typography variant="caption">
    //         {moment(params.row.quizDate).format('MMM DD ')} at{' '}
    //         {moment(params.row.quizDate).format('hh:mm a ')}
    //       </Typography>
    //     </>
    //   ),
    //   width: 140,
    // },
    {
      field: 'score',
      headerName: 'Score',
      renderCell: (params) => (
        <>
          <Typography variant="caption">
            <b> {params.row.score}</b> / {params.row.point}
          </Typography>
        </>
      ),
      width: 80,
    },

    {
      field: 'semesterName',
      headerName: 'SEM',
      width: 100,
    },

    {
      field: 'courseTitle',
      headerName: 'Course Name',
      width: 150,
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
          getRowId={(row) => row.scoreId}
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
      </DashboardCard>
    </PageContainer>
  );
};

export default Quiz;
