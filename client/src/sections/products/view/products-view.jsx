import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

export default function ScholarshipApprovalForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    collegeName: '',
    bankaccount: '',
    scholarshipType: '',
  });

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const postData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : '',
      submissionDate: formData.submissionDate ? new Date(formData.submissionDate).toISOString().split('T')[0] : '',
    };

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/api/scholarship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
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
      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Name
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
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Email
            </FormLabel>
            <TextField
              name="email"
              label="Enter your email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Course
            </FormLabel>
            <TextField
              name="course"
              label="Enter your course"
              variant="outlined"
              fullWidth
              value={formData.course}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              College Name
            </FormLabel>
            <TextField
              name="collegeName"
              label="Enter College Name"
              variant="outlined"
              fullWidth
              value={formData.collegeName}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Parent/Guardian Contact
            </FormLabel>
            <TextField
              name="scholarshipamount"
              label="Enter Scholarship Amount"
              variant="outlined"
              fullWidth
              value={formData.scholarshipamount}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Bank Account Number
            </FormLabel>
            <TextField
              name="bankaccount"
              label="Enter Bank Account Number"
              variant="outlined"
              fullWidth
              value={formData.bankaccount}
              onChange={handleChange}
              required
              sx={textFieldStyle}
            />
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
        Submit Application
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
        height: 1,
        marginTop: '-5%',
        marginLeft: '7%',
        marginRight: '7%',
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={cardStyle}>
          <Typography variant="h4" sx={{ marginBottom: '30px' }}>
            Scholarship Approval Form
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

// Styles
const formLabelStyle = {
  marginBottom: '10px',
  fontSize: '17px',
  color: 'white',
};

const textFieldStyle = {
  marginBottom: '20px',
};

const alertStyle = {
  mt: 2,
};

const submitButtonStyle = {
  marginTop: '40px',
};
  
const cardStyle = {
  p: 5,
  width: 1,
};
