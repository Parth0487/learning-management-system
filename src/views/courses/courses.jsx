import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const Course = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const { userTypeCode = null } = userDetails;
  const [tableData, setTableData] = useState([]);

  const [semesterList, setSemesterList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  const [filters, setFilters] = useState({
    faculty: [],
    semester: [],
  });

  useEffect(() => {
    fetchFaculties();
    fetchSemesters();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    fetch('http://localhost:5000/course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type header
      },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length) {
          let courseList = data;

          if (userTypeCode === 'STUDENT') {
            courseList = data.filter((i) => i.isPublished === 'yes');
            console.log('courseList: ', courseList);
          }

          let list = courseList.map((i) => {
            return { ...i, id: i.courseId };
          });

          setTableData(list);
        } else {
          setTableData([]);
        }
      });
  };

  const fetchFaculties = async () => {
    fetch('http://localhost:5000/faculty', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.map((i) => {
          return { ...i, id: i.userId };
        });

        setFacultyList(list);
      });
  };

  const fetchSemesters = async () => {
    fetch('http://localhost:5000/semester', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        let list = data.map((i) => {
          return { ...i, id: i.semesterId };
        });

        setSemesterList(list);
      });
  };

  const columns = [
    {
      field: 'courseId',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'title',
      headerName: 'Course',
      minWidth: 250,
      // flex: 1,
      renderCell: (params) => (
        <Typography
          fontSize={13}
          variant="body1"
          textAlign="right"
          component={Link}
          to={`/courses/view/${params.row.courseId}`}
          sx={{ color: '#000' }}
        >
          {params.row.title}
        </Typography>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      // width: '70%',
      flex: 1,
    },

    {
      field: 'isPublished',
      headerName: 'Status',
      renderCell: (params) => {
        return (
          <>
            <Chip
              label={params.row.isPublished === 'yes' ? 'Published' : 'Not Published'}
              color={params.row.isPublished === 'yes' ? 'primary' : 'error'}
              size="small"
            />
          </>
        );
      },
      width: 140,
    },
  ];

  return (
    <PageContainer title="Courses" description="this is Sample page">
      <DashboardCard title="Courses">
        <Grid container spacing={3}>
          {['FACULTY', 'STUDENT'].includes(userTypeCode) ? null : (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="faculty-select-label">Faculty</InputLabel>
                <Select
                  labelId="faculty-select-label"
                  id="faculty-select"
                  multiple
                  value={filters.faculty}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      faculty: e.target.value,
                    })
                  }
                  input={<OutlinedInput label="Faculty" />}
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {facultyList.map((faculty) => (
                    <MenuItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="semester-select-label">Semester</InputLabel>
              <Select
                labelId="semester-select-label"
                id="semester-select"
                multiple
                value={filters.semester}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    semester: e.target.value,
                  })
                }
                input={<OutlinedInput label="Semester" />}
                // renderValue={(selected) => selected.join(', ')}
              >
                {semesterList.map((semester) => (
                  <MenuItem key={semester.id} value={semester.id}>
                    {semester.semesterName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box my={1}></Box>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          getRowId={(row) => row.courseId}
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

export default Course;
