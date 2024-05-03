import React, { useEffect, useState } from 'react';
import {
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

const Course = () => {
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
          let list = data.map((i) => {
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
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 400,
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
      // width: 140,
      flex: 1,
    },
  ];

  return (
    <PageContainer title="Students" description="this is Sample page">
      <DashboardCard title="Students">
        <Grid container spacing={3}>
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

export default Course;
