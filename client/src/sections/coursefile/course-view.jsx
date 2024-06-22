import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Card,
  Stack,
  Checkbox,
  Typography,
  FormControl,
  FormControlLabel,
  Button,
} from '@mui/material';

const skillCategories = [
  {
    name: 'Soft Skills',
    options: ['Communication', 'Teamwork', 'Time Management', 'Leadership'],
  },
  {
    name: 'Interview Skills',
    options: ['Mock Interviews', 'Behavioral Questions', 'Technical Questions'],
  },
  {
    name: 'English Speaking',
    options: ['Basic English', 'Intermediate English', 'Advanced English'],
  },
  {
    name: 'Career Guidance',
    options: ['Resume Building', 'Job Search Strategies', 'Networking'],
  },
  {
    name: 'Mentoring',
    options: ['Personal Development', 'Career Advice', 'Goal Setting'],
  },
];

const NotificationView = () => {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(skillCategories.length).fill([]) // Initialize with arrays for each category
  );

  const handleCheckboxChange = (categoryIndex, option) => {
    const newSelectedOptions = [...selectedOptions];
    const categorySelectedOptions = newSelectedOptions[categoryIndex];
    if (categorySelectedOptions.includes(option)) {
      newSelectedOptions[categoryIndex] = categorySelectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
    } else {
      newSelectedOptions[categoryIndex] = [...categorySelectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    console.log('Selected Options:', selectedOptions);
    // Handle form submission logic here, e.g., send data to API
  };

  return (
    <Box
    style={{padding:"25px"}}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Vocational Training
        </Typography>
        <Stack spacing={4}>
          {skillCategories.map((category, categoryIndex) => (
            <FormControl key={categoryIndex} fullWidth>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {category.name}
              </Typography>
              {category.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  control={
                    <Checkbox
                      checked={selectedOptions[categoryIndex].includes(option)}
                      onChange={() =>
                        handleCheckboxChange(categoryIndex, option)
                      }
                    />
                  }
                  label={option}
                />
              ))}
            </FormControl>
          ))}
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card>
    </Box>
  );
};

const NotificationsPage = () => (
  <>
    <Helmet>
      <title>Notifications</title>
    </Helmet>
    <NotificationView />
  </>
);

export default NotificationsPage;
