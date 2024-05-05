import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  DialogActions,
  TextField,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { IconPlus } from '@tabler/icons';

const { REACT_APP_API } = process.env;

const AddStudent = ({ handleSubmit }) => {
  const { id: courseId = 1 } = useParams();

  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState([]);

  const [selectedValues, setSelectedValues] = useState([]);

  const handleClose = () => {
    setSelectedValues([]);
    setOpen(false);
  };

  useEffect(() => {
    fetchCourseStudentList();
  }, [open]);

  const fetchCourseStudentList = async () => {
    fetch(`${REACT_APP_API}/student-by-course/${courseId}?includeStudent=yes`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => console.error('Error loading the course data:', error));
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<IconPlus />}
        onClick={() => setOpen(true)}
      >
        Add Student
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>Select Students</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="faculty-select-label">Select Students</InputLabel>
                <Select
                  label="Select Students"
                  fullWidth
                  multiple
                  value={selectedValues}
                  onChange={(e) => setSelectedValues(e.target.value)}
                  input={<OutlinedInput label="Select Students" />}
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {options && options.length ? (
                    options.map((option) => (
                      <MenuItem key={option.userId} value={option.userId}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={null} disabled>
                      No records found
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit(selectedValues, 'student');
              handleClose();
              setSelectedValues([]);
              setTimeout(() => {
                fetchCourseStudentList();
              }, 1000);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStudent;
