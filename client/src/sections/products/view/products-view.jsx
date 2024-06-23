import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

export default function ScholarshipApprovalForm() {
  const courseTypes = ['Engineering', 'BBA', 'MBBS'];
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'Engineering',
    collegeName: '',
    amount: '',
    bankAccountNumber: '',
    marksheet10: null,
    marksheet12: null,
    incomeStatement: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('course', formData.course);
    data.append('collegeName', formData.collegeName);
    data.append('amount', formData.amount);
    data.append('bankAccountNumber', formData.bankAccountNumber);
    data.append('marksheet10', formData.marksheet10);
    data.append('marksheet12', formData.marksheet12);
    data.append('incomeStatement', formData.incomeStatement);

    console.log(data);
    
    try {
      const response = await fetch('http://localhost:8000/api/scholarshipRequests/', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        // Handle success
        console.log('Scholarship request submitted');
      } else {
        setError('Error submitting scholarship request');
      }
    } catch (err) {
      setError('Error submitting scholarship request');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3} style={{ padding: '25px' }}>
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
              required
              value={formData.name}
              onChange={handleChange}
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
              required
              value={formData.email}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Course Type
            </FormLabel>
            <TextField
              label="Course Type"
              variant="outlined"
              name="course"
              required
              fullWidth
              select
              value={formData.course}
              onChange={handleChange}
              sx={textFieldStyle}
            >
              {courseTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
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
              required
              value={formData.collegeName}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Scholarship Amount
            </FormLabel>
            <TextField
              name="amount"
              label="Enter Scholarship Amount"
              variant="outlined"
              fullWidth
              required
              value={formData.amount}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Bank Account Number
            </FormLabel>
            <TextField
              name="bankAccountNumber"
              label="Enter Bank Account Number"
              variant="outlined"
              fullWidth
              required
              value={formData.bankAccountNumber}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Grid>

          {/* File Upload Fields */}
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              10th Marksheet
            </FormLabel>
            <Box sx={uploadContainerStyle}>
              <input
                type="file"
                id="marksheet10"
                name="marksheet10"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={fileInputStyle}
              />
              <label htmlFor="marksheet10" style={fileLabelStyle}>
                {formData.marksheet10 ? formData.marksheet10.name : 'Choose a file'}
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              12th Marksheet
            </FormLabel>
            <Box sx={uploadContainerStyle}>
              <input
                type="file"
                id="marksheet12"
                name="marksheet12"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={fileInputStyle}
              />
              <label htmlFor="marksheet12" style={fileLabelStyle}>
                {formData.marksheet12 ? formData.marksheet12.name : 'Choose a file'}
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Income Statement
            </FormLabel>
            <Box sx={uploadContainerStyle}>
              <input
                type="file"
                id="incomeStatement"
                name="incomeStatement"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={fileInputStyle}
              />
              <label htmlFor="incomeStatement" style={fileLabelStyle}>
                {formData.incomeStatement ? formData.incomeStatement.name : 'Choose a file'}
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
        loading={loading}
      >
        Submit Application
      </LoadingButton>
    </form>
  );

  return (
    <Box
      style={{ marginTop: '105px' }}
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 20px',
      }}
    >
      <Card sx={cardStyle}>
        <Typography variant="h4" sx={{ marginBottom: '30px', textAlign: 'center' }}>
          Scholarship Approval Form
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
