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
import { useRouter } from 'next/router';
import { bgGradient } from '../src/theme/css';
import Logo from '../src/components/Logo';

export default function TrusteeApprovalForm() {
  const theme = useTheme();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    documentsSubmitted: false,
    essayAttached: false,
    bankPassBookAttached: false,
    marksheetsAttached: false,
    feeReceiptsAttached: false,
    otherComments: '',
    finalScholarshipAmount: '',
    digitalSignature: '',
    termsAndConditions:'',
  });

  const handleChange = (event) => {
    const { name, checked, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: event.target.type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log(formValues);
    // Handle submission logic here
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
          sx={{
            p: 5,
            width: 1,
            maxWidth: 600,
            m: { xs: 2, md: 3 },
          }}
        >
          <Typography variant="h4">Trustee Approval Form</Typography>

          <FormGroup sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Checkbox checked={formValues.documentsSubmitted} onChange={handleChange} name="documentsSubmitted" />}
              label="All documents submitted in sequence"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.bankPassBookAttached} onChange={handleChange} name="studentPassbookAttached" />}
              label="Passbook/statement of student and parent attached"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.marksheetsAttached} onChange={handleChange} name="marksheetsAttached" />}
              label="Marksheets of 10th, 12th are attached"
            />
            <FormControlLabel
              control={<Checkbox checked={formValues.feeReceiptsAttached} onChange={handleChange} name="feeReceiptsAttached" />}
              label="Last year fee receipts are attached"
            />
            <FormControlLabel 
            control={<Checkbox checked={formValues.termsAndConditions} onChange={handleChange} name="termsAndConditions" />}
            label="Accept the terms and conditions for the final approval of scholarship"
            />
          </FormGroup>
          <Divider sx={{ my: 3 }} />

          <TextField
            name="otherComments"
            label="Other comments"
            multiline
            rows={4}
            value={formValues.otherComments}
            onChange={handleChange}
            sx={{ mt: 3 }}
          />

          <TextField
            name="finalScholarshipAmount"
            label="Final Scholarship Amount"
            type="number"
            value={formValues.finalScholarshipAmount}
            onChange={handleChange}
            fullWidth
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
