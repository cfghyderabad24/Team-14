import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

export default function AttendanceuploadForm() {
  const [Course, setCourse] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    Course: '',
    t_days: '',
    p_days: '',
    attendance_sheet: null,
  });

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0], // Assuming single file upload
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      const response = await fetch('http://localhost:8000/api/renewal', {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        setLoading(false);
        console.log('Data posted successfully');
      } else {
        setLoading(false);
        console.error('Failed to post data');
        setError('Failed to submit form. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error posting data:', err);
      setError('Error submitting form. Please try again later.');
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3} style={{ padding: '25px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Name of student
            </FormLabel>
            <TextField
              name="name"
              label="Enter Your Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
          </Grid>
          <Select
            value={Course}
            onChange={(e) => setCourse(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Course' }}
          >
            <MenuItem value="" disabled>
              Course
            </MenuItem>
            <MenuItem value="english_speaking">English Speeking</MenuItem>
            <MenuItem value="soft_skills">soft skills</MenuItem>
            <MenuItem value="interview_skills">Interview_skills</MenuItem>
            <MenuItem value="career_guidance">Career_guidance</MenuItem>
          </Select>

          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Total no of working days
            </FormLabel>
            <TextField
              name="t_days"
              label="Enter total No of days"
              variant="outlined"
              fullWidth
              value={formData.t_days}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Total no of present days
            </FormLabel>
            <TextField
              name="p_days"
              label="Enter present No of days"
              variant="outlined"
              fullWidth
              value={formData.p_days}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
          </Grid>

          {/* New File Upload Fields */}
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Attendance sheet
            </FormLabel>
            <Box sx={uploadContainerStyle}>
              <input
                type="file"
                id="attendance_sheet"
                name="attendance_sheet"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                style={fileInputStyle}
              />
              <label htmlFor="attendance_sheet" style={fileLabelStyle}>
                {formData.attendance_sheet ? formData.attendance_sheet.name : 'Choose a file'}
              </label>
            </Box>
          </Grid>
        </Grid>
      </Stack>

      {error && (
        <Alert severity="error" sx={alertStyle}>
          {error}
        </Alert>
      )}

      <LoadingButton
        sx={submitButtonStyle}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
      >
        Submit Attendance
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
      }}
    >
      <Card sx={cardStyle}>
        <Typography variant="h4" sx={{ marginBottom: '30px', textAlign: 'center' }}>
          Attendance form
        </Typography>
        {renderForm}
      </Card>
    </Box>
  );
}

// Styles
const formLabelStyle = {
  marginBottom: '10px',
  fontSize: '17px',
  color: 'black',
};

const textFieldStyle = {
  marginBottom: '20px',
};

const alertStyle = {
  mt: 2,
};

const submitButtonStyle = {
  marginTop: '40px',
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#155a9a',
  },
};

const uploadContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '5px',
  backgroundColor: '#f0f0f0',
  borderRadius: '4px',
  padding: '8px 16px',
  cursor: 'pointer',
  border: '1px solid #ccc',
};

const fileInputStyle = {
  display: 'none',
};

const fileLabelStyle = {
  cursor: 'pointer',
  color: '#1976d2',
  fontWeight: 'bold',
};

const cardStyle = {
  padding: '40px 20px',
  width: '100%',
  maxWidth: '800px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
};
