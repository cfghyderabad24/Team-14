/* eslint-disable import/no-unresolved */
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

export default function VolunteerApprovalForm() {
  const theme = useTheme();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    documentsSubmitted: false,
    essayAttached: false,
    studentPassbookAttached: false,
    parentsPassbookAttached: false,
    marksheetsAttached: false,
    feeReceiptsAttached: false,
    motherNoMore: false,
    motherHandicapped: false,
    fatherNoMore: false,
    fatherHandicapped: false,
    otherComments: '',
  });

  const handleChange = (event) => {
    const { name, checked, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: event.target.type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission on click event
    console.log(formValues);
    router.push('/dashboard');
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
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{p: 5,
            width: 1,
            maxWidth: 600,
            m: { xs: 2, md: 3 },
          }}
        >
          <Typography variant="h4">Volunteer Approval Form</Typography>

          <FormGroup sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Checkbox checked={formValues.documentsSubmitted} onChange={handleChange} name="documentsSubmitted" />}
              label="All documents submitted in sequence"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.essayAttached} onChange={handleChange} name="essayAttached" />}
              label="Student essay is attached"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.studentPassbookAttached} onChange={handleChange} name="studentPassbookAttached" />}
              label="Passbook/statement of student attached"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.parentsPassbookAttached} onChange={handleChange} name="parentsPassbookAttached" />}
              label="Passbook/statement of parents attached"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.marksheetsAttached} onChange={handleChange} name="marksheetsAttached" />}
              label="Marksheets of 10th and 12th are attached"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.feeReceiptsAttached} onChange={handleChange} name="feeReceiptsAttached" />}
              label="Last year fee receipts are attached"
            />
          </FormGroup>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Comments on the family status of the applicant (tick on checkbox on whichever is applicable):
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={formValues.motherNoMore} onChange={handleChange} name="motherNoMore" />}
              label="Mother no more"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.motherHandicapped} onChange={handleChange} name="motherHandicapped" />}
              label="Mother handicapped"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.fatherNoMore} onChange={handleChange} name="fatherNoMore" />}
              label="Father no more"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.fatherHandicapped} onChange={handleChange} name="fatherHandicapped" />}
              label="Father handicapped"
            />
          </FormGroup>
          
          
          <TextField
            name="otherComments"
            label="Other comments"
            multiline
            rows={4}
            value={formValues.otherComments}
            onChange={handleChange}
            sx={{ mt: 3 }}
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </Card>
      </Stack>
    </Box>
  );
}
