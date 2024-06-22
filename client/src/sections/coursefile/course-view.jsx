import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Box, Card, Stack,  Select, Checkbox, MenuItem, Typography , FormControl, FormControlLabel} from '@mui/material';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const NotificationView = () => {
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(''));

  const handleSelectChange = (index, event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Vocational Training </Typography>
        <Stack spacing={4}>
          {[...Array(5)].map((_, index) => (
            <FormControl key={index} fullWidth>
              <FormControlLabel
                control={<Checkbox />}
                label={`Checkbox ${index + 1}`}
              />
              <Select
                value={selectedOptions[index]}
                onChange={(event) => handleSelectChange(index, event)}
                displayEmpty
                inputProps={{ 'aria-label': `Dropdown ${index + 1}` }}
                sx={{ mt: 2 }}
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                {options.map((option, optIndex) => (
                  <MenuItem key={optIndex} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

export default function NotificationsPage() {
  return (
    <>
      <Helmet>
        <title> Notifications </title>
      </Helmet>

      <NotificationView />
    </>
  );
}
