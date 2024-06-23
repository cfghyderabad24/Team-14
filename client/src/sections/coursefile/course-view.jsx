import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  Box,
  Card,
  Stack,
  Select,
  Checkbox,
  MenuItem,
  Typography,
  FormControl,
  FormControlLabel,
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
    Array(skillCategories.length).fill('')
  );

  const handleSelectChange = (categoryIndex, event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[categoryIndex] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <Box
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
                  control={<Checkbox />}
                  label={option}
                />
              ))}
              <Select
                value={selectedOptions[categoryIndex]}
                onChange={(event) => handleSelectChange(categoryIndex, event)}
                displayEmpty
                inputProps={{ 'aria-label': `${category.name} Dropdown` }}
                sx={{ mt: 2 }}
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                {category.options.map((option, optIndex) => (
                  <MenuItem key={optIndex} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Stack>
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
