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
    collegeName: '',
    scholarshipType: '',
    tenthCertificate: null,
    twelfthCertificate: null,
    parentIncomeCertificate: null,
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

      const response = await fetch('http://localhost:8080/api/scholarship', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
              Scholarship Amount
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
          

          {/* New File Upload Fields */}
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              Payment Reciept
            </FormLabel>
            <Box sx={uploadContainerStyle}>
              <input
                type="file"
                id="Paymentreciept"
                name="Paymentreciept"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                style={fileInputStyle}
              />
              <label htmlFor="Paymentreciept" style={fileLabelStyle}>
                {formData.Paymentreciept ? formData.Paymentreciept.name : 'Choose a file'}
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel component="legend" sx={formLabelStyle}>
              College Marksheet
            </FormLabel>
            <Box sx={uploadContainerStyle}>
              <input
                type="file"
                id="collegemarksheet"
                name="collegemarksheet"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                style={fileInputStyle}
              />
              <label htmlFor="collegemarksheet" style={fileLabelStyle}>
                {formData.collegemarksheet ? formData.collegemarksheet.name : 'Choose a file'}
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
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
      }}
    >
      <Card sx={cardStyle}>
        <Typography variant="h4" sx={{ marginBottom: '30px', textAlign: 'center' }}>
          Renewal Form
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
