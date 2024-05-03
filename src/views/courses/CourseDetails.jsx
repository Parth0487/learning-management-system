import React, { useEffect, useState } from 'react';
import { Typography, Chip, Divider, Box, Grid, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { IconPlus } from '@tabler/icons';
import AddStudent from './AddStudent';
import AddFaculty from './AddFaculty';

const CourseDetails = () => {
  const { id: courseId = 1 } = useParams();
  const [courseData, setCourseData] = useState({});
  const [studentList, setStudentList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

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
      flex: 1,
    },
    {
      field: 'userName',
      headerName: 'Username',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      valueGetter: () => 'Active',
      // minWidth: 150,
      flex: 1,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchCourseDetails();
    fetchCourseStudentList();
    fetchCourseFecultyList();
  };

  const fetchCourseDetails = async () => {
    fetch(`http://localhost:5000/course/${courseId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  const fetchCourseStudentList = async () => {
    fetch(`http://localhost:5000/student-by-course/${courseId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setStudentList(data);
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  const fetchCourseFecultyList = async () => {
    fetch(`http://localhost:5000/faculty-by-course/${courseId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setFacultyList(data);
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  const addUserForCourse = async (userId, type) => {
    if (userId && userId.length) {
      let req = {
        userId,
        type,
        courseId,
      };

      fetch(`http://localhost:5000/add-user-to-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type header
        },
        body: JSON.stringify(req),
      })
        .then((response) => response.json())
        .then((data) => {
          fetchData();
        })
        .catch((error) => console.error('Error loading the course data:', error));
    }
  };

  return (
    <PageContainer title="Course Details" description="Detailed view of the course">
      <DashboardCard title="Course Details">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {courseData.title || 'No title available'}{' '}
              {courseData.semesterId && `(${courseData.semesterName})`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {courseData.description || 'No description available'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <Typography variant="body1" color="textSecondary">
              Due:{' '}
              {courseData.date ? moment(courseData.date).format('MMMM Do YYYY') : 'No due date'}
            </Typography> */}

            <Typography variant="h6">{courseData.semesterName}</Typography>

            <Typography variant="body1" color="textSecondary">
              Total Faculties: <b>{courseData.totalFaculties ? courseData.totalFaculties : 0}</b>
            </Typography>

            <Typography variant="body1" color="textSecondary">
              Total Students: <b>{courseData.totalStudents ? courseData.totalStudents : 0}</b>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Additional details like submission guidelines, grading criteria, and resource
              materials can be added here. This text serves as placeholder content to fill the page
              and offer a complete look.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box my={2}></Box>
          </Grid>

          <Grid item xs display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">Faculty List</Typography>
            </Box>
            <Box>
              <AddFaculty handleSubmit={addUserForCourse} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <DataGrid
              rows={facultyList}
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
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box my={2}></Box>
          </Grid>

          <Grid item xs display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">Student List</Typography>
            </Box>
            <Box>
              {/* <Button variant="contained" color="primary" startIcon={<IconPlus />}>
                Add Student
              </Button> */}
              <AddStudent handleSubmit={addUserForCourse} />
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
              }}
            />
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default CourseDetails;
