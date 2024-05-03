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
import { useParams } from 'react-router-dom';
import { IconPlus } from '@tabler/icons';

const AddFaculty = ({ handleSubmit }) => {
  const { id: courseId = 1 } = useParams();

  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState([]);

  const [selectedValues, setSelectedValues] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCourseFacultyList();
  }, []);

  const fetchCourseFacultyList = async () => {
    fetch(`http://localhost:5000/faculty-by-course/${courseId}?includeFaculty=yes`, {
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
        Add Faculty
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>Select Faculties</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="faculty-select-label">Select Faculties</InputLabel>
                <Select
                  label="Select Faculties"
                  fullWidth
                  multiple
                  value={selectedValues}
                  onChange={(e) => setSelectedValues(e.target.value)}
                  input={<OutlinedInput label="Select Faculties" />}
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
              handleSubmit(selectedValues, 'faculty');
              handleClose();
              setSelectedValues([]);
              setTimeout(() => {
                fetchCourseFacultyList();
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

export default AddFaculty;
