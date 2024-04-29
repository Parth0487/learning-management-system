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
    fetch('http://localhost:5000/faculty/quiz', {
      method: 'GET',
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
    { field: 'quizId', headerName: 'ID', width: 50 },
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
          to={`/quiz/view/${params.row.quizId}`}
          sx={{ color: '#000' }}
        >
          {params.row.title}
        </Typography>
      ),
    },
    { field: 'description', headerName: 'Description', width: 400 },
    {
      field: 'date',
      headerName: 'Due Date',
      renderCell: (params) => (
        <>
          <Typography variant="caption">{moment(params.row.date).format('yyyy-MM-DD')}</Typography>
        </>
      ),
    },
    {
      field: 'questions',
      headerName: 'Questions',
      width: 100,
    },
  ];

  return (
    <PageContainer title="Quiz" description="this is Sample page">
      <DashboardCard title="Quiz">
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowId={(row) => row.quizId}
          sx={{
            minHeight: '300px',
            '& .MuiDataGrid-row': {
              borderTop: '1px solid #ccc', // Adds a border around each row
            },
          }}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default Quiz;
