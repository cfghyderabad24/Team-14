import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

const AluminiNotification = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to server
    console.log(formData);
    // Reset form after submission
    setFormData({ name: '', message: '' });
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Notification from alumni</Typography>

          <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
            <Stack spacing={3}>
              <TextField
                name="name"
                label="Your Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                name="message"
                label="Your Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Stack>
    </Box>
  );
};

export default AluminiNotification;
